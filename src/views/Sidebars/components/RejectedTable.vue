<script setup lang="ts">

import {ref} from "vue";
import {useWagerStore} from "@/store/modules/wager";

const selectedTransactions = ref();
const wagers = ref();
const event = ref();
const events = ref();

const calculateTotal = () => {
  let result = 0;
  useWagerStore().getRejectedWagers()?.forEach((item) => {
    result += item.wager_amount;
  });
  return result.toFixed(2);
}
</script>

<template>
<!--  <pre>{{ rejected }}</pre>-->
  <div class="flex justify-content-between">
    <div class="title">
      Apuestas rechazadas
    </div>
  </div>
  <DataTable
      v-model:selection="selectedTransactions"
      :value="useWagerStore().getRejectedWagers()"
      dataKey="id"
      class="p-datatable-small"
      tableStyle="width:100%"
      stripedRows
      scrollable
      scrollHeight="200px">
    <Column field="name" header="SORTEO"
            headerStyle="background-color: #F08080; color: black;  font-size: smaller; text-align: left;"
            style="font-size: x-small; text-align: left;"
            footerStyle="background-color: #F08080; color: black;  font-size: smaller; margin-left: 8px !important;"
            footer="TOTAL:"
            class="header">
      <template #body="{data}">
        {{ data.event_name }}
      </template>
    </Column>
    <Column field="wager" header="APUESTA"
            headerStyle="background-color: #F08080; color: black;  font-size: smaller; width: 130px !important; padding-right: 1px; text-align: center !important;"
            footerStyle="background-color: #F08080; color: black;  font-size: smaller; margin-left: 4px; !important"
            style="text-align: center;"
            width="100%">
      <template #body="{data}">
        {{ data.wager }}
      </template>
    </Column>
    <Column field="amount"
            header="MONTO"
            headerStyle="background-color: #F08080; color: black;  font-size: smaller; text-align: right !important;"
            style="text-align: right; width: 10px;"
            footerStyle="background-color: #F08080; color: black;  font-size: normal; margin-left: 4px; !important">
      <template #body="{data}">
        <!--         <pre>{{ csvToArray(data.wager).length }}</pre>-->
        {{ data.amount?(data.amount?.toFixed(2)):data.wager_amount?.toFixed(2) }}
      </template>
      <template #footer="{data}">
                {{ calculateTotal() }}
      </template>
    </Column>
    <Column header=""
            style=""
            headerStyle="background-color: #F08080; color: white;  font-size: xx-small; text-align: left; color white;"
            footerStyle="background-color: #F08080; color: white;  font-size: smaller; margin-left: 4px; !important">
      <template #header="{ data }">
<!--        <Button icon="pi pi-times" severity="danger" rounded outlined class="deleteButton"/>-->
      </template>

      <template #body="{ data, field }">

      </template>
    </Column>
  </DataTable>
</template>

<style scoped lang="scss">
:deep(.p-datatable-thead > tr > th) {
  //background-color: #FFCCCB !important;
  //color: black !important;
}

.p-datatable-header {
  background-color: #FFCCCB !important;
}

:deep(.p-datatable-footer	) {
  background-color: #FFCCCB !important;
  color: black !important;
}

.title {
  font-size: 0.857rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--surface-900);
  margin: 0.75rem 0 0.75rem 0;
}

</style>