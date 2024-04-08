<script setup lang="ts">
import {ref, watch} from "vue";
import {useSelectedEventStore} from "@/store/modules/selectedEvent";

interface Props {
  products: object;
  timeRange: string,
}

const props = defineProps<Props>()

const loadingProducts = ref(false);
const products = ref();
const selectedProduct = ref();
const selectedEventStore = useSelectedEventStore();

products.value = props.products.events;

watch(selectedProduct, function () {
  selectedEventStore.setSelectedEvents(selectedProduct.value, props.timeRange)
}, 1);

</script>

<template>
  <DataTable
      :value="products"
      :loading="loadingProducts"
      dataKey="id"
      responsiveLayout="scroll"
      scrollHeight="300px"
      :rows="12"
      v-model:selection="selectedProduct"
      :scrollable="true"
      :rowHover="true"
      stripedRows
      scrollable
      class="p-datatable-gridlines p-datatable-striped p-datatable-sm"
  >
    <Column field="name" header="SORTEO"
            headerStyle="background-color: var(--primary-color); color: white;  border-radius: 5px 0 0 0;"
            style="min-width: 10px;font-size: smaller">
      <template #body="{data}">
        {{ data.name }} {{ (data.list) !== '-' ? data.list : ''}}
      </template>
    </Column>
    <Column field="event_time" header="HORA"
            headerStyle="background-color: var(--primary-color); color: white;"/>
    <Column selectionMode="multiple" header=""
            headerStyle="background-color: var(--primary-color); color: white; width: 10px; border-radius: 0 5px 0 0;"
            style="width: 10px;"/>
  </DataTable>
</template>

<style scoped lang="scss">

</style>