<script setup lang="ts">

import {useWagerStackStore} from "@/store/modules/wagerStack";
import {removeItemFromArray} from "@/utils/general";

const deleteWager = (wagerId) => {
  let w = useWagerStackStore().getWagers();
  w.indexOf(wagerId);
  w = removeItemFromArray(w, wagerId);
  useWagerStackStore().setWagers(w);
}
</script>

<template>
  <div class="wagerContainer">
    <DataTable :value="useWagerStackStore().getWagers()"
               scrollable
               scrollHeight="210px"
               striped-rows
               class="p-datatable-sm"
               tableStyle="width: 51px">
      <Column field=""
              header=""
              style="padding: 2px 0 0 0;text-align: center;font-size: x-small;">
        <template #body="slotProps">
          {{ slotProps.data}}
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
  height: 219px;
  margin-left: 3px;
  width: 70px;
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
  font-size: 10px;
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