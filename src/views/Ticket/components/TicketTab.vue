<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {ref, onMounted} from "vue";
import {FilterMatchMode, FilterOperator} from "primevue/api";
import {useUserStore} from "@/store/modules/user";
import {getHourList, formatDate, convertUTCtoVzla} from "@/utils/time";
import {formatCurrency, getDaysAgoDate, getTodayDate} from "@/utils/general";

import TicketView from "../components/Ticket/TicketView.vue";
import Logo from "@/layout/composables/Logo.vue";
import UserService from "@/services/UserService";

const filters = ref();
const hourList = ref();

const tickets = ref([]);
const ticketsTotal = ref(0);

const loading = ref(false);
const userService = new UserService();
const userStore = useUserStore();

const selectedTicket = ref();
const displayTicketView = ref(false);

onMounted(async () => {
  loading.value = true;
  if(userStore.getUser()?.id) {
    tickets.value = await userService.getTickets(
        {
          filter: {
            user_id: userStore.getUser().id,
            between_created_at: [getDaysAgoDate(30), getTodayDate()],
          },
          sort: {
            sale_time: "desc",
          }
        }
    );
  }

  if (tickets.value !== undefined) {
    tickets.value.forEach((item) => {
      ticketsTotal.value += item.total;
    })
  }

  hourList.value = getHourList();
  loading.value = false;
});

const items = ref([
  {
    label: 'Tickets',
    icon: 'pi pi-fw pi-home',
    to: '/history/games'
  },
  {
    label: 'Transacciones',
    icon: 'pi pi-fw pi-calendar',
    to: '/history/funds'
  },
]);

const viewTicket = () => {
  displayTicketView.value = true;
};

</script>

<template>
  <DataTable v-model:selection="selectedTicket"
             :value="tickets"
             selectionMode="single"
             dataKey="id"
             scrollable
             scroll-height="400px"
             stripedRows
             :metaKeySelection="false"
             @rowSelect="viewTicket"
             :loading="loading"
             v-tooltip="'Click para ver ticket'"
             tableStyle="width: 100%">
    <Column
        field="sale_time"
        header="Fecha"
        :sortable="true"
        dataType="date"
        filterField="sale_date"
        style="text-align: center;"
        :showFilterMatchModes="false"
        :show-add-button="false"
        :show-apply-button="false">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.sale_time) }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar v-model="filterModel.value" selectionMode="range"/>
      </template>
    </Column>

    <Column
        field="sale_time"
        header="Hora"
        :sortable="true"
        style="text-align: center;"
        filterField="sale_hour"
        :showFilterMatchModes="false"
        :show-add-button="false"
        :show-filter-operator="false">
      <template #body="slotProps">
        {{ convertUTCtoVzla(slotProps.data.sale_time) }}
      </template>
      <template #filter="{ filterModel }">
        <Dropdown
            v-model="filterModel.value"
            :options="hourList"
            optionLabel="label"
            optionValue="value"
            placeholder="Seleccionar Hora"
            class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column field="total"
            header="Monto"
            style="text-align: right;"
            :sortable="true">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.total) }}
      </template>
    </Column>
    <Column field="prize"
            header="Premio"
            style="text-align: right;"
            :sortable="true">
      <template #body="slotProps">
        <div style="font-weight: bold;" v-if="slotProps.data.prize>0">
          {{ formatCurrency(slotProps.data.prize) }}
        </div>

      </template>
    </Column>
  </DataTable>

  <Dialog v-model:visible="displayTicketView"
          modal
          header="&nbsp"
          style="width: 32vw; min-width: 410px;"
          headerStyle="background: red;"
          class="ticket-view">
    <template #header>
      <div style="width: 100%;">
        <Logo style="width: 350px; height: 70px"/>
        <div class="flex justify-content-between">
          <div>
            <div class="flex-column">
              <div class="d-time">
                FECHA: {{ formatDate(selectedTicket.sale_time) }} | {{ convertUTCtoVzla(selectedTicket.sale_time) }}
              </div>
              <div class="ticket-id">{{ selectedTicket.id }}</div>
            </div>
          </div>
          <div class="message">¡BUENA SUERTE!</div>
        </div>
      </div>
    </template>
    <TicketView :ticket="selectedTicket"/>
  </Dialog>

</template>

<style lang="scss" scoped>
.bl-header {
  width: 100%;
  height: 30px;
  position: relative;
}

.bl-bg {
  /* font-weight: bold; */
  /* background-color: aqua; */
  z-index: 0;
  position: absolute;
  width: 100px;
  height: 25px;
  -webkit-transform: skew(25deg);
  -moz-transform: skew(18deg);
  -o-transform: skew(18deg);
  background: #861388;
  /* //Needs vertical adjustment */
  /* margin-top: 20px;
  margin-bottom: 10px; */
}

.bl-header h5 {
  z-index: 10;
  color: white;
  position: inherit;
}

.ticketLink {
  color: var(--primary-color);
  cursor: pointer;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: red ! important;
  padding: 10px !important;
}

.ticket-num {
  //font-weight: bold;
  font-size: 12px;
}

.ticket-id {
  font-size: 9px;
}

.d-time {
  font-size: 11px;
  font-weight: bold;
}

.message {
  font-weight: bold;
}

.logo {
  width: 200px;
}
</style>