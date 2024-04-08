<script setup lang="ts">

import {onMounted, ref} from "vue";
import useClipboard from "vue-clipboard3";
import {useUserStore} from "@/store/modules/user";
import {useToast} from "primevue/usetoast";
import UserService from "@/services/UserService";
import {getTodayDate, getTodayDateFormatted} from "@/utils/general";

const amount = ref(0);
const dDate = ref(getTodayDateFormatted());

const visible = ref(false);
const reference = ref('');

const userService = new UserService();

const toast = useToast();

// Copy to Clipboard
const {toClipboard} = useClipboard();
const copy = async (event) => {
  try {
    const text = event.currentTarget.parentElement.textContent;
    await toClipboard(text);
  } catch (e) {
    console.error(e);
  }
};

const reportPayment = async () => {
  const user = useUserStore().getUser();

  const response = await userService.createTransactionRequest({
        "transaction_request": {
          "user_id": user.id,
          "type": "deposit",
          "status": "pending",
          "amount": amount.value,
          "reference": reference.value,
          "created_at": dDate.value,
        }
      }
  );

  if (response?.error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Transaccion no creada | ' + response.error,
      life: 10000
    });
  } else {
    toast.add({severity: 'success', summary: 'Satisfactorio', detail: 'Pago reportado', life: 3000})
  }
  visible.value = false;
}
</script>

<template>
  <div class="card" id="cardoverflow">
    <div class="windowTitle">Ingresar Dinero</div>
    <br/>

    <TabView>
      <TabPanel header="Pago Móvil">
        <div class="container flex justify-content-center align-items-center flex-wrap pt-6 pb-6">
          <div class="block1 pr-8 flex">
            <img src="/images/pago_movil.png" style="height: 12rem"/>
          </div>
          <div class="shadow-4 p-6 border-round-xl w-24rem" style="background-color: var(--surface-b);">
            <p class="w-full mb-2 font-bold">Código de cuenta Banesco</p>
            <p class="text-xl">Banesco-0134
              <button @click="copy"><i class="pi pi-clone"></i></button>
            </p>
            <p class="w-full mb-2 font-bold">Número de RIF</p>
            <p class="text-xl">J-29421115-1
              <button @click="copy"><i class="pi pi-clone"></i></button>
            </p>
            <p class="w-full mb-2 font-bold">Número Telefónico</p>
            <p class="text-xl">0412-280-1028
              <button @click="copy"><i class="pi pi-clone"></i></button>
            </p>
            <Button @click="visible=true" class="report" id="ingress" label="Reportar pago"
                    severity="success"></Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Transferencia Bancaria">
        <div class="container flex justify-content-center align-items-center flex-wrap pt-6 pb-6">
          <div class="block1 pr-8 flex">
            <img src="/images/bank_transfer.png" style="height: 12rem"/>
          </div>
          <div class="shadow-4 p-6 border-round-xl w-24rem" style="background-color: var(--surface-b);">
            <p class="w-full mb-2 font-bold">Titular de la Cuenta</p>
            <p class="text-xl">Operadora Banklot, C.A
              <button @click="copy"><i class="pi pi-clone"></i></button>
            </p>
            <p class="w-full mb-2 font-bold">Número de Cuenta</p>
            <p class="text-xl">0134-0027-01-0271040408
              <button @click="copy"><i class="pi pi-clone"></i></button>
            </p>
            <p class="w-full mb-2 font-bold">Número de RIF</p>
            <p class="text-xl">J-29421115-1
              <button @click="copy"><i class="pi pi-clone"></i></button>
            </p>
            <Button @click="visible=true" class="report" id="ingress" label="Reportar pago"
                    severity="success"></Button>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>

  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Reportar pago</span>
      </div>
    </template>
    <div>
      <div class="m-5">Por favor introduzca:</div>
      <div class="flex justify-content-center report-button">


        <div>
          <div class="flex justify-content-between p-1">
            <div class="label">Últimos 5 números de su transacción:</div>
            <div>
              <InputMask class="" v-model="reference" mask="99999" placeholder="#####" style="width: 100px;"/>
            </div>
          </div>
          <div class="flex justify-content-between p-1">
            <div class="label">Monto:</div>
            <div>
              <InputNumber v-model="amount" />
            </div>
          </div>
          <div class="flex justify-content-between p-1">
            <div class="label">Fecha:</div>
            <div>
              <Calendar v-model="dDate" dateFormat="dd/mm/yyyy" style="width: 100px;"/>
            </div>
          </div>
        </div>


      </div>
      <div class="m-5">Tan pronto su pago sea aprobado, dispondrá del saldo correspondiente para seguir jugando.</div>
    </div>
    <!--    {{ (deposit && deposit.replace('_','').length !== 5) }}-->
    <template #footer>
      <Button label="Reportar pago"
              icon="pi pi-check"
              severity="success"
              :disabled="deposit && deposit.replace('_','').length !== 5"
              @click="reportPayment" autofocus/>
    </template>
  </Dialog>


</template>

<style lang="scss" scoped>
.report {
  width: 100%;
  height: 50px;
}


#rate {
  display: block;
  margin-top: 1rem;
  font-size: x-large;
  margin-left: 3.4rem;
}

#title {
  display: inline-block;
  margin-left: 0.6rem;
  margin-top: 0.6rem;
  font-size: large;
  font-weight: 700;
}

button {
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  transition: transform 0.7s ease-in-out;
}

#cardoverflow {
  overflow: scroll;
}

@media (max-width: 1414px) {
  .block1 img {
    display: none;
  }
  .block2 img {
    display: none;
  }
  #panel {
    width: 100%;
  }
  #cardoverflow {
    overflow: scroll;
  }
  #colwidth {
    width: 90%;
  }
  #ingress {
    width: 100%;
    margin-top: 4%;
  }
}

.reference {
  //display: flex;
  //justify-content: center;
  width: 100px;
  text-align: right;
}

.label {
  margin: 5px 20px 0 0;
}

:deep(.p-inputtext) {
    width: 100px;
    text-align: right;
}
</style>
