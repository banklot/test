<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {ref, onMounted} from "vue";

import {FilterMatchMode, FilterOperator} from "primevue/api";
import {formatCurrency, getDaysAgoDate, getTodayDate} from "@/utils/general";
import {convertUTCtoVzla, formatDate, formatTime, formatTime2} from "@/utils/time";
import UserService from "@/services/UserService";
import {useUserStore} from "@/store/modules/user";
import {translateTransactionType} from "@/utils/variables";

const transactions = ref();
const filters = ref();
const fundsHistory = ref([]);
const loading = ref(true);
const userService = new UserService();
const userStore = useUserStore();

onMounted(async () => {
  loading.value = true;
  transactions.value = await userService.getTransactions(
      {
        filter: {
          user_id: userStore.getUser()?.id,
          between_created_at: [getDaysAgoDate(10), getTodayDate()]
        },
        sort: {
          created_at: "desc",
        }
      }
  );
  loading.value = false;
});

const initFilters = () => {
  filters.value = {
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    name: {
      operator: FilterOperator.AND,
      constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
    },
    "sorteo.name": {
      operator: FilterOperator.AND,
      constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
    },
    product_id: {value: null, matchMode: FilterMatchMode.IN},
    date: {
      operator: FilterOperator.AND,
      constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}],
    },
    hora: {
      operator: FilterOperator.AND,
      constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}],
    },
  };
};

initFilters();

const clearFilter = () => {
  initFilters();
};

const placeSign = (data) => {
  return (data?.transaction_type === 'wager' || data?.transaction_type === 'debit')?'-':'';
}

</script>

<template>

  <DataTable
      v-model:filters="filters"
      :value="transactions && transactions.response"
      paginator
      showGridlines
      stripedRows
      :rows="12"
      dataKey="id"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="['id_operation', 'funds_amount.name', 'product.name', 'date']"
      responsiveLayout="scroll"
      tableStyle="min-width: 10rem">

    <Column field="created_at" header="Fecha" sortable style="text-align: center">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.created_at) }}
      </template>
    </Column>
    <Column field="created_at" header="Hora" sortable style="text-align: center">
      <template #body="slotProps">
        {{ formatTime2(slotProps.data.created_at) }}
      </template>
    </Column>

    <Column field="transaction_type" header="Operación" style="text-align: center">
      <template #body="slotProps">
        {{ translateTransactionType(slotProps.data.transaction_type) }}
      </template>
    </Column>

    <Column field="amount"
            header="Monto"
            :sortable="true"
            style="text-align: right">
      <template #body="slotProps">
        <div :class="'transaction-type '+slotProps.data.transaction_type">
          {{ placeSign(slotProps.data)}}{{ formatCurrency(slotProps.data.amount)}}
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style>

.bl-header h5 {
  z-index: 10;
  color: white;
  position: inherit;
}
.transaction-type {
  &.prize {
  font-weight: bold;
  }
}

</style>