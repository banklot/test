<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {onMounted, ref, watch} from "vue";
import {useUserStore} from "@/store/modules/user";
import {formatCurrency} from "@/utils/general";
import {delay, formatDate} from "@/utils/time";
import UserService from "@/services/UserService";
import {translateTransactionStatus, translateTransactionType} from "@/utils/variables";

const funds = ref(0);
const user = ref();
const transactions = ref();
const readyToRequest = ref(true);
const maxToBeCashed = ref();

const displayRefund = ref(false);

const userService = new UserService();

onMounted(async () => {
  // Fetch total balance and gains
  user.value = useUserStore().getUser();
  await getData();
});

const getData = async () => {
  funds.value = user.value.total_balance;
  // Fetch transactions
  transactions.value = await userService.getTransactionRequests({
    filter: {
      user_id: user.value.id,
    },
    sort: {created_at: "desc",}
  });
  maxToBeCashed.value =  await userService.getMaxTransactionRequests({});
}
const requestPayment = async () => {
    readyToRequest.value = false;
    displayRefund.value = false;
    // Create request transaction
    await userService.createTransactionRequest({
          "transaction_request": {
            "user_id": user.value.id,
            "amount": funds.value,
            "type": "withdrawal",
            "status": "pending",
          }
        }
    );
    await getData();
    await delay(10000);
    readyToRequest.value = true;
}

watch(funds, async (newFunds, oldFunds) => {
  if (newFunds > user.value.total_balance) {
    funds.value = user.value.total_balance;
  }
})
</script>

<template>
  <div class="card" id="cardoverflow">
    <div class="windowTitle">Cobrar ganancias</div>
    <div class="grid mt-6 justify-content-center ">
      <div class="col-8 border-round shadow-4 border-round-2xl">
        <h4>Usted ha ganado</h4>
        <div class="flex bg-black-alpha-10 mb-4 h-3rem justify-content-center align-items-center">
              <span class="total-gains-number">
                {{ formatCurrency(user?.total_gains) }}</span>
        </div>
      </div>
      <div class="col-8 border-round shadow-4 border-round-2xl mt-4">
        <h4>Fondos</h4>
        <div class=" flex bg-black-alpha-10 mb-4 h-3rem justify-content-center align-items-center">
          <span class="total-balance-number">
            {{ formatCurrency(maxToBeCashed?.total) }}
          </span>
        </div>
        <div class="gains-action-button">
          <Button label="RETIRO" raised @click="displayRefund = true" class="gains-button" :disabled="!readyToRequest"/>
        </div>
      </div>

      <div class="col-8 border-round shadow-4 border-round-2xl mt-4">
        <h4>Movimientos</h4>
        <DataTable :value="transactions" paginator :rows="8" :rowsPerPageOptions="[5, 10, 20, 50]" striped-rows
                   tableStyle="min-width:10rem">
          <Column field="created_at" header="Fecha" style="text-align: center;">
            <template #body="{data}">
              {{ formatDate(data.created_at) }}
            </template>
          </Column>
          <Column field="type" header="Tipo" style="text-align: center;">
            <template #body="{data}">
              {{ translateTransactionType(data.type) }}
            </template>
          </Column>
          <Column field="amount" header="Monto" style="text-align: right;">
            <template #body="{data}">
              {{ data.amount?formatCurrency(data.amount):''  }}
            </template>
          </Column>
          <Column field="status" header="Estatus" style="text-align: center;">
            <template #body="{data}">
              {{ translateTransactionStatus(data.status) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="displayRefund" modal header="Header" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Solicitud de Retiro</span>
      </div>
    </template>
    <div class="m-5">
      <div>Las solicitudes de retiro de procesaran en el horario comprendido entre las 8:00AM y las 5:00PM (hora de
        Venezuela).
      </div>
      <div>El monto máximo de retiro por pago móvil es de XXXX, los montos mayores se procesarán administrativamente.
      </div>
      <div class="flex justify-content-center report-button m-5">
        <InputNumber v-model="funds" class="total-balance-input"/>
      </div>
      <div>Tan pronto su solicitud de retiro pago sea aprobada, podra verificar el monto en su cuenta bancaria.</div>
    </div>
    <!--    {{ (deposit && deposit.replace('_','').length !== 5) }}-->
    <template #footer>
      <Button label="Aceptar"
              icon="pi pi-check"
              severity="success"
              :disabled="!funds"
              @click="requestPayment" autofocus/>
    </template>
  </Dialog>

</template>

<style lang="scss" scoped>
.gains-action-button {
  display: flex;
  justify-content: space-between;

  .gains-button {
    width: 100%;
    height: 50px;
  }
}

@media (max-width: 991px) {
  .gains-action-button {
    display: block;
    justify-content: center;

    .gains-button {
      min-width: 100%;
      margin: .3rem 0 .1rem 0;
    }
  }
  #cardoverflow {
    overflow: scroll;
  }
}

.bl-header {
  width: 100%;
  height: 30px;
  position: relative;
}

.bl-bg {
  z-index: 0;
  position: absolute;
  width: 200px;
  height: 25px;
  -webkit-transform: skew(160deg);
  -moz-transform: skew(160deg);
  -o-transform: skew(160deg);
  background: rgb(45, 46, 130);
  background: linear-gradient(
          90deg,
          rgba(45, 46, 130, 1) 48%,
          rgba(57, 169, 53, 1) 72%
  );
  margin-left: 0.4rem;
}

.bl-header h5 {
  position: inherit;
  z-index: 15;
  color: white;
  text-align: justify;
  margin-left: 1.3rem;

  font-weight: bold;
}

.total-balance-number {
  font-size: x-large;
  font-weight: bold;
  color: green;
}

.total-gains-number {
  font-size: x-large;
  font-weight: bold;
}

:deep(.p-inputtext ) {
  font-size: 2rem !important;
  color: green;
  text-align: center;
}
</style>
