<script setup lang="ts">

import {removeItemFromArray} from "@/utils/general";
import {useWagerStackAnimalitosStore} from "@/store/modules/wagerStackAnimalitos";
import { getAnimalitos} from "@/utils/animalitos";

const deleteWager = (wagerId) => {
  let w = useWagerStackAnimalitosStore().getWagers();
  w.indexOf(wagerId);
  w = removeItemFromArray(w, wagerId);
  useWagerStackAnimalitosStore().setWagers(w);
}
</script>

<template>
  <div class="wagerContainer">

    <DataTable :value="useWagerStackAnimalitosStore().getWagers()"
               scrollable
               scrollHeight="210px"
               striped-rows
               class="p-datatable-sm"
               tableStyle="width: 51px">
      <Column field=""
              header=""
              style="padding: 2px 0 0 0;text-align: center;font-size: x-small;">
        <template #body="slotProps">
          {{ getAnimalitos().find(c=>c.id === slotProps.data)?.name.toUpperCase() }}
        </template>
      </Column>
      <Column field=""
              header=""
              style="padding: 2px 0 6px 0;text-align: center;width: 10px;margin-right: 2px;">
        <template #body="slotProps">
          <div>
            <span class="p-button-icon pi pi-times x" @click="deleteWager(slotProps.data)"></span>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">

.wagerContainer {
  padding: 0 0 0 4px;
  border: 2px solid lightgray;
  border-radius: 10px;
  transition: box-shadow 0.15s;
  color: var(--text-color);
  height: 221px;
  margin-left: -6px;
  width: 80px;
  margin-bottom: 3px;
}

:deep(p-datatable-header) {
  display: none;
}

.tableWagers .p-datatable .p-datatable-header {
  display: none !important;
}

:deep(.p-datatable .p-datatable-header) {
  display: none !important;
}

:deep(.p-datatable-thead) {
  display: none !important;
}

.p-button-icon {
  font-size: 8px !important;
  color: red !important;
  //border: solid 1px red;
  //border-radius: 25px;
  padding: 1px;
}

.wagerField {
  padding: 2px 0 0 0;
  text-align: center;
  font-size: x-small;
}

.xField {
  padding: 2px 0 6px 0;
  text-align: center;
  width: 10px;
  margin-right: 2px;
}

.x {
  font-size: 5px;
}


</style>