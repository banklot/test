<script setup lang="ts">
import {ref} from "vue";
import Table from "../Events/EventsTable.vue";
import {useSelectedEventStore} from "@/store/modules/selectedEvent";
import {getTodayDate} from "@/utils/general";
import GamingService from "@/services/GamingService";
import {organiseProductsByTimeOfTheDay} from "@/utils/time";
import {useWagerStackStore} from "@/store/modules/wagerStack";
import WagerList from "../../Lottery/components/WagerList.vue";
import WagerListAnimalitos from "../../Animalitos/components/WagerList.vue";
import {useAppStore} from "@/store/modules/app";

const products = ref();
const loadingProducts = ref(false);
const wagerStack = useWagerStackStore();
const selectedEventStore = useSelectedEventStore();
const expandedRows = ref([]);
const activeTab = ref(0);

const gamingService = new GamingService();

const emit = defineEmits(['addWagers', 'previous'])

const refreshProducts = async () => {
  loadingProducts.value = true;
  // products.value = wagerEvent.getEvent();
  // Fetch events of the day and store them in Vuex
  products.value = await gamingService.getEvents({
    filter: getFilter(),
    sort: {
      event_timestamp: "asc",
      display_order: 1,
      list_id: 1
    }
  });
  products.value = organiseProductsByTimeOfTheDay(products.value);
  if (products.value) {
    expandedRows.value = products.value.filter((item: { id: number; }) => item.id === 0);
    activeTab.value = products.value[3].activeTab;
  }
  loadingProducts.value = false;
}

const getFilter = () => {
  const from = useAppStore().getFrom();
  let filter ={
    event_timestamp: getTodayDate(),
    game_category: from,
    status: 'open'
  };
  if (checkIfZodiacWagers() && from === 'lottery') {
    filter['list_id'] = 3
  }
  return filter;
}

const addWagers = async () => {
  emit('addWagers', selectedEventStore.getAllSelectedEvents());
}

const previous = () => {
  emit('previous')
}

function getNumSelectedProducts() {
  let result: boolean;
  const res = selectedEventStore.getAllSelectedEvents();
  if (res !== null) {
    result = (res?.length <= 0);
  } else {
    result = false;
  }
  return result;
}

// Checks whether there are zodiac wagers in the stack and limit events to list_id = 3
function checkIfZodiacWagers() {
  let result = false;
  const w = wagerStack.getWagers();
  w.forEach((item)=> {
    if(item.length>3) {
      result = true;
    }
  })
  return result;
}
refreshProducts();
</script>

<template>
  <div class="containerP" >
    <div class="flex justify-content-between">
      <div class="w-full mr-2">
        <Accordion v-model:activeIndex="activeTab">
          <AccordionTab header="Día">
            <Table :products="products.find(c=>c.id===0)" timeRange="morning" v-if="products"/>
          </AccordionTab>
          <AccordionTab header="Tarde">
            <Table :products="products.find(c=>c.id===1)" timeRange="afternoon" v-if="products"/>
          </AccordionTab>
          <AccordionTab header="Noche">
            <Table :products="products.find(c=>c.id===2)" timeRange="evening" v-if="products"/>
          </AccordionTab>
        </Accordion>
      </div>
      <div style="width: 70px; margin-top: 4px;">
        <WagerList v-if="useAppStore().getFrom()==='lottery'"/>
        <WagerListAnimalitos v-if="useAppStore().getFrom()==='animalitos'"/>
      </div>
    </div>

    <div class="buttons flex justify-content-between">
      <Button class="key delete" icon="pi pi-arrow-left" @click="previous"/>
      <Button class="key enter" icon="pi pi-arrow-right" @click="addWagers"
              :disabled="getNumSelectedProducts()"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.p-datatable .p-datatable-thead > tr > th) {
  padding: 4px;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 4px;
}

::v-global(.p-card .p-card-body) {
  padding: unset;
}

.eventName {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
}

@media (max-width: 1025px) and (min-width: 990px) {
  .displayImage {
    display: none;
  }
}

.containerP {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
  width: 307px;
  padding: 3px;
}

.key {
  border: solid 1px black;
  border-radius: 10px;
  padding: 20px 20px 20px 26px;
  font-size: 25px;
  margin: 3px;
  height: 70px;
  width: 70px;

  &:disabled {
    background-color: gray;
  }
}

.enter {
  background-color: #2c9d00;
  font-size: 35px;

  &:hover {
    opacity: 0.75;
    background-color: #2c9d00;
  }
}

:deep(.p-accordion .p-accordion-content) {
  padding: unset;
}

:deep(.p-datatable.p-datatable-sm .p-datatable-header) {
  padding: unset;
}

:deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
  padding: 5px 5px;
}

.delete {
  left: 142px;
}
</style>
