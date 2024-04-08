<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useWagerStore} from "@/store/modules/wager";
import {useUserStore} from "@/store/modules/user";
import {useToast} from "primevue/usetoast";
import {getTodayDate, getDaysAgoDate, logout} from "@/utils/general";
import {translateError} from "@/utils/messages";
import {formatDate, convertUTCtoVzla, formatTime2} from "@/utils/time";
import {getGameProducts} from "@/utils/variables";
import Table from "./components/Table.vue";
import RejectedTable from "./components/RejectedTable.vue";
import TicketService from "@/services/TicketService";
import GamingService from "@/services/GamingService";
import router from "@/router";

const ticketService = new TicketService();
const gamingService = new GamingService();

const loading = ref(false);
const wagerStore = useWagerStore();
const user = useUserStore().getUser()
const toast = useToast();
const displayNoFunds = ref(false);
const errorWagers = ref();
const results = ref();
const selectedProduct = ref();
const products = ref();
const gameProducts = getGameProducts();

onMounted(async () => {
  loading.value = true;
  products.value = await gamingService.getProducts()
  await getResults(undefined)

  loading.value = false;
});
const getResults = async (product_id) => {
  results.value = [];
  const request = {
    filter: {
      between_created_at: [getDaysAgoDate(30), getTodayDate()],
    },
    sort: {
      event_timestamp: "desc",
    },
  }
  if (product_id) {
    request.filter["game_product_id"] = product_id
  }
  results.value = await gamingService.getResults(request);
}
const getLogo = (product) => {
  const logo = getGameProducts().find(c=>c.name === product).logo
  return `/images/products/${logo}`
}

/////////////////////////////////////




const createTicket = async () => {
  loading.value = true;
  // If no user found, logout
  if (!user) {
    logout();
  }
  const wagers = wagerStore.getWager();
  const response = await ticketService.createTicket({
    ticket: {
      user_id: user.id,
      status: "sold",
      currency: 0,
      wagers: wagers,
      total: wagerStore.getTotalWager(),
    }
  });
  if (response && response.error) {
    handleError(response.error);
  } else {
    user.total_balance = user.total_balance - wagerStore.getTotalWager();
    wagerStore.resetWager();
    wagerStore.resetTotalWager();
    toast.add({
      severity: 'success',
      summary: 'Exito',
      detail: `Ticket generado exitosamente`,
      life: 5000
    });
    wagerStore.setRejectedWagers([]);
  }
  loading.value = false;
};

const handleError = (response) => {
  // if (response.error.status-=)
  if (response === "not enough funds") {
    displayNoFunds.value = true;
  } else if (response.error_wagers) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `No se pudo generar el ticket | Algunas apuestas no tienen cupo`,
      life: 10000
    });
    errorWagers.value = response.error_wagers;
    organiseRejected(errorWagers.value);
  } else {
    // getRejectedWagers()
    {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `No se pudo generar el ticket | ${translateError(response.error)}`,
        life: 10000
      });
      router.push({path: 'fondos'})
    }
  }
}

const organiseRejected = async (response) => {
  let rejected = [];
  let accepted = [];

  const events = await gamingService.getEvents({
    filter: {
      event_timestamp: getTodayDate(),
    },
    sort: {
      event_timestamp: "asc",
      display_order: 1,
      list_id: 1
    }
  });

  console.log(events)
  let wagers = wagerStore.getWager();

  let rejectedWagers = response;
  let rejectedKeys = Object.keys(response)

  if (rejectedWagers) {
    try {
      rejectedKeys.forEach((wagerKey) => {
        let r = rejectedWagers[wagerKey]
        let wagerTotal = 0;
        r.event_inventory.forEach((x) => {

          let dEvent = events.find(c => c.id === x.event_id);

          x.wager = wagerKey;
          x.event_name = dEvent.name + ' ' + dEvent?.list + ' ' + dEvent.event_time;
          x.amount = x.wager_amount;
          rejected.push(x);
          // Remove rejected wagers from main wagers list
        })
      })
    } catch (e) {
      console.log(e);
    }
  }


  wagers.forEach((item) => {
    if (!rejected.find(c=>c.event_id === item.event_id && c.wager === item.wager)) {
      accepted.push(item);
    }

  });
  console.log(accepted);
  wagerStore.setWager(accepted)

  wagerStore.setRejectedWagers(rejected)
}




</script>

<template>
  <Accordion :multiple="true" :activeIndex="[0]">
    <AccordionTab header="Apuestas">
  <div class="flex justify-content-between">
    <div class="title">
      Lista de Apuestas
    </div>
  </div>
  <div class="mt-1">
    <Table
        :wagers="wagerStore.getWager()"
        @createTicket="createTicket"
    />
  </div>
  <hr>
  <div v-if="wagerStore.getRejectedWagers() && Object.keys(wagerStore.getRejectedWagers())?.length > 0">
      <RejectedTable />
  </div>
  <Toast/>
  <Dialog v-model:visible="displayNoFunds" modal header="Saldo insuficiente" :style="{ width: '20rem' }"
          :breakpoints="{ '1199px': '30vw', '575px': '90vw' }">

    <Panel header="¿Cómo ingresar fondos usando Pago Móvil?" id="panel">
      <!-- <p class="mb-1"> -->
      <b> 1</b>. Una vez tengas un monto definido, realiza un pago móvil desde la cuenta con la
      que te registraste a la cuenta de GanadorAPP.
      <br><br>
      <b>2.</b> Para realizar el pago móvil te indicamos aquí la información bancaria.
      <br><br>
      <b> 3</b>. Pasados unos minutos, la transacción se reflejará en tu balance de fondos, con el cual
      podrás jugar en cualquiera de los sorteos.
      <!-- </p> -->
    </Panel>
  </Dialog>
</AccordionTab>
<AccordionTab header="Resultados">
  <Dropdown v-model="selectedProduct"
              :options="products"
              @update:modelValue="getResults"
              optionLabel="name"
              optionValue="id"
              placeholder="TODOS"
              class="product-filter">
      <template #option="slotProps">
        <div class="flex flex-column"  >
          <div class="flex"  >
          <div class="mr-4"><img alt="" :src="'/images/products/transparency/'+gameProducts[slotProps.option.id]?.logo" style="width:40px; height: auto;"/></div>
          <div>{{ slotProps.option.name }}</div>
          </div>
        </div>
      </template>
    </Dropdown>

    <Card
        v-for="data of results"
        class="cardresults"
        :key="data.id"
        :style="{'border-left-color': gameProducts[data.game_product_id].color }">

      <template #content>
        <div class="grid flex p-0 m-0" >
          <div class="col-1 resultlogo flex align-items-center p-0 m-0">
            <img
                :alt="data.name"
                :src="'/images/products/transparency/' + gameProducts[data.game_product_id].logo"
                style="width:150px; max-height: 80px;"/>
          </div>
          <div class="col resulttext border-left-1 border-400 p-0 m-0">
            <div class="results">
              Resultado: {{ data?.main_result }}
            </div>
            <div class="lista">
              # Lista {{ data.list }}
            </div>
            <div class="time">
              {{ formatDate(data.result_created_at) }} -
              {{ formatTime2(data?.event_timestamp) }}
            </div>

          </div>
        </div>
      </template>
    </Card>









    </AccordionTab>



</Accordion>
</template>

<style scoped lang="scss">
.title {
  font-size: 0.857rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--surface-900);
  margin: 0.75rem 0.75rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  padding: 4px;
  font-family: system-ui !important;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 4px;
}

::v-global(.p-card .p-card-body) {
  padding: unset;
}

::v-global(.p-datatable .p-datatable-tfoot > tr > td) {
  padding: 4px;
}

:deep(.p-column-header-content ) {
  display: flex;
  justify-content: center;
}

.printTicket {
  width: 100%;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-weight: bold;
}

.deleteButton {
  //background-color: var(--surface-a);
  color: white !important;
}

:deep(.pi) {
  font-size: 7px;
}

:deep(.p-button.p-button-danger.p-button-outlined, .p-buttonset.p-button-danger > .p-button.p-button-outlined, .p-splitbutton.p-button-danger > .p-button.p-button-outlined) {
  width: 15px;
  height: 15px;
}

:deep(.p-button.p-button-danger.p-button-outlined:enabled:hover, .p-buttonset.p-button-danger > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-danger > .p-button.p-button-outlined:enabled:hover) {
  width: 15px;
  height: 15px;
}


#cardoverflow {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardresults {
  display: flex;
  flex-wrap: true;
  width: 240px;
  // height: 100px;
  margin-bottom: 1.3rem;
  background-color: var(--surface-b);
  // padding: 0.5rem;
  // justify-content: start;
  border-left: solid 0.4em;

}

.resultlogo {
  width: 10rem;

  img {
    display: flex;
    margin-top: 0;
    max-width: 6rem;
    max-height: 8rem;
    padding-left: 2rem;

  }
}

.product-filter {
  width: 240px !important;
  margin-bottom: 10px;
}
:deep(.p-inputtext) {
  font-size: 1rem;
}


.result {
  font-size: medium;
  font-style: italic;

}

.lista {
  font-size: small;
  font-weight: lighter;
  font-style: italic;

}

.resulttext {
  text-align: start;
  padding-left: 2rem !important;
  font-size: medium;
  font-weight: bold;


}
// .time{
//   font-size: small;
// }


@media (max-width: 991px) {
  #cardoverflow {
    overflow: scroll;
  }
  .cardresults {
    display: flex;
    width: 368px;
    margin-left: 0rem;
  }
}

.resulttext {
  text-align: start;
  padding-left: 6rem;
  font-size: 1.1em;
  font-weight: bold;
}

.product-filter {
  width: 433px;
  margin-bottom: 10px;
}
:deep(.p-inputtext) {
  font-size: 1rem;
}
</style>

