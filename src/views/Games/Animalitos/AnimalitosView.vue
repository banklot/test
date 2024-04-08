<script setup lang="ts">

import {ref} from "vue";
import {getEventNameAndTime} from "@/utils/general";
import {useWagerStackStore} from "@/store/modules/wagerStack";
import {useSelectedEventStore} from "@/store/modules/selectedEvent";
import {useEventStore} from "@/store/modules/event";
import {useWagerStore} from "@/store/modules/wager";

import Keypad from "../Animalitos/components/Keypad.vue";
import ProductsTable from "../components/Events/Events.vue";
import {useWagerStackAnimalitosStore} from "@/store/modules/wagerStackAnimalitos";
import {getAnimalitos} from "@/utils/animalitos";

const dailyEvents = useEventStore().getAllEvents();
const wagerStore = useWagerStore();

const wagerStack = useWagerStackAnimalitosStore();
const selectedEventStore = useSelectedEventStore();
const step = ref(1);

const next = () => {
  step.value = 2;
}
const previous = () => {
  step.value = 1;
}

const addWagers = (events: { id: any; }[]) => {
  const amount = wagerStack.getAmount();
  let totalWagers = wagerStack.getWagers();
  let totalAmount = 0;

  let i = totalWagers.length;
  let ticketWagers = [];

  events = selectedEventStore.getAllSelectedEvents();

  events.forEach((item: { id: any; }) => {
    // Account for list of wagers
    try{
      totalWagers.forEach((iterWager) => {
        i++;
        ticketWagers.push({
          id: i,
          event_id: item.id,
          event_name: getEventNameAndTime(events.find(c => c.id === item.id)),
          // time: thisEvent.event_time,
          game_id: 5,
          wager: getAnimalitos().find(c=> c.id === iterWager).name.toUpperCase(),
          amount: amount,
        });
        totalAmount += amount;
      })
    } catch (e) {
      console.log(e)
    }

  })
  let currentWagers = wagerStore.getWager();
  wagerStore.setWager(ticketWagers.concat(currentWagers));
  wagerStore.setSelectedEvents([]);
  selectedEventStore.resetAllSelectedEvents();
  wagerStack.resetWagerStack();
  step.value = 1;
}

</script>

<template>
  <div class="card">
    <div class="windowTitle mb-2">Animalitos</div>
    <div class="flex justify-content-around flex-wrap">
      <div class="keypad" v-if="step===1">
        <Keypad @next="next"/>
      </div>
      <div class="products" v-if="step===2">
        <ProductsTable
            @addWagers="addWagers"
            @previous="previous"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products {
  border: solid var(--primary-color) 4px;
  border-radius: 15px;
  padding: 6px;
  margin: 30px;
  width: 327px;
  height: 477px;
}

.keypad {
  border: solid var(--primary-color) 4px;
  border-radius: 15px;
  padding: 3px;
  margin: 20px;
  width: 327px;
  height: 477px;
}

@media (max-width: 991px) {
  .keypad {
    // border: solid var(--primary-color) 4px;
    // border-radius: 15px;
    padding: 3px;
    margin: 15px;
    // width: 255px;
    // height: 480px;
  }
}

.disabledbuttons {
  pointer-events: none;
  opacity: 0.4;
}
</style>
