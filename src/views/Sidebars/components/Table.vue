<script setup lang="ts">

import {ref} from "vue";
import {useWagerStore} from "@/store/modules/wager";

const selectedTransactions = ref();
const wagers = ref();
const rejectedWagers = ref();

const wagerTotal = ref();
const event = ref();
const loading = ref(false);

const wagerStore = useWagerStore();

const props = defineProps(['wagers'])
const emit = defineEmits(['createTicket'])

const deleteAllWagers = () => {
  wagerStore.setWager([]);
  wagerStore.setTotalWager(0);
  wagerStore.setRejectedWagers([]);
  wagers.value = wagerStore.getWager();
  wagerTotal.value = wagerStore.getTotalWager();
}

const deleteWager = (wager) => {
  let allWagers = wagerStore.getWager();
  allWagers.splice(allWagers.findIndex(c => c.id === wager.id), 1);
  wagerStore.setWager(allWagers);
  wagerStore.setTotalWager(wagerStore.getTotalWager() - wager.amount);
}

const calculateWagersTotal = () => {
  let total = 0;
  let wagers = props.wagers
  wagers.forEach((item) => {
    total += item.amount;
  });
  wagerStore.setTotalWager(total);
  return total;
};

const createTicket = () => {
  emit('createTicket')
}

const getAmount = (data) => {
  let result = data.amount;
  let rejected = wagerStore.getRejectedWagers();
  let wagers = wagerStore.getWager();

  try {
    if (rejected !== undefined) {
      if (rejected?.find(c => c.event_id === data?.event_id && c.wager === data?.wager)) {
        wagers = wagers.filter(c => (c.event_id === data?.event_id && c.wager === data?.wager));
      }
    }
  } catch(e) {
    console.log(e)
  }

  return result;
}

wagers.value = wagerStore.getWager();
rejectedWagers.value = wagerStore.getRejectedWagers();
wagerTotal.value = calculateWagersTotal();

const checkIfRejected= (eventId, wager) => {
  let result = false;
  try {

    if (wagerStore?.getRejectedWagers()) {
      result =  wagerStore?.getRejectedWagers().find(c => (c.event_id === eventId  && c.wager === wager )) !== undefined
    }
  } catch (e) {
    console.log(e);
  }
  return result;
}

</script>

<template>
  <DataTable
      v-model:selection="selectedTransactions"
      :value="props.wagers"
      dataKey="id"
      class="p-datatable-small"
      tableStyle="width:100%"
      stripedRows
      scrollable
      scrollHeight="460px"
      :rowClass="({ event_id, wager }) => checkIfRejected(event_id, wager) ? 'bg-cyan-100': null">

    <Column field="name" header="SORTEO"
            headerStyle="background-color: var(--primary-color); color: white;  font-size: smaller; text-align: left;"
            style="font-size: x-small; text-align: left;"
            footerStyle="background-color: var(--primary-color); color: white;  font-size: smaller; margin-left: 8px !important;"
            footer="TOTAL:"
            class="header"
    >
      <template #body="{data}">
        {{ data.event_name }}
      </template>
    </Column>
    <Column field="wager" header="APUESTA"
            headerStyle="background-color: var(--primary-color); color: white;  font-size: smaller; width: 130px !important; padding-right: 1px; text-align: center !important;"
            footerStyle="background-color: var(--primary-color); color: white;  font-size: smaller; margin-left: 4px; !important"
            style="text-align: center;"
            width="100%"
    >
      <template #body="{data}">
        {{ data.wager }}
      </template>
    </Column>
    <Column field="amount"
            header="MONTO"
            headerStyle="background-color: var(--primary-color); color: white;  font-size: smaller; text-align: right !important;"
            style="text-align: right; width: 10px;"
            footerStyle="background-color: var(--primary-color); color: white;  font-size: normal; margin-left: 4px; !important"
    >
      <template #body="{data}">
        {{ getAmount(data)?.toFixed(2) }}
      </template>
      <template #footer="{data}">
        {{ calculateWagersTotal().toFixed(2) }}
      </template>
    </Column>

    <Column header=""
            style=""
            headerStyle="background-color: var(--primary-color); color: white;  font-size: xx-small; text-align: left; color white;"
            footerStyle="background-color: var(--primary-color); color: white;  font-size: smaller; margin-left: 4px; !important">
      <template #header="{ data }">
        <Button icon="pi pi-times"
                severity="danger"
                rounded
                outlined
                @click="deleteAllWagers()"
                class="deleteButton"/>
      </template>

      <template #body="{ data, field }">
        <!--          <pre>{{data}}</pre>-->
        <Button icon="pi pi-times"
                severity="danger"
                rounded
                outlined
                @click="deleteWager(data)"/>
        <!--                        <pre>{{ data}}</pre>-->
      </template>
    </Column>
  </DataTable>
  <div class="mt-2">
    <Button type="button"
            label="Generar ticket"
            icon="pi pi-print"
            :loading="loading"
            @click="createTicket"
            class="printTicket"
            :disabled="wagerStore.getTotalWager() === 0"

    />
  </div>
</template>

<style scoped lang="scss">
.printTicket {
  width: 100%;
  background-color: var(--secondary-color);
  color: white; //var(--primary-color);
  font-weight: bold;
  height: 50px;

}

:deep(.printTicket .pi) {
  font-size: 16px !important;
}

</style>