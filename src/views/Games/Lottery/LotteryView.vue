<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import ProductsTable from "../components/Events/Events.vue";

import {onMounted, ref} from "vue";
import {useWagerStore} from "@/store/modules/wager";
import {useSelectedEventStore} from "@/store/modules/selectedEvent";
import {csvToArray, getEventNameAndTime} from "@/utils/general";
import {useWagerStackStore} from "@/store/modules/wagerStack";
import {useEventStore} from "@/store/modules/event";
import Keypad from "../Lottery/components/Keypad.vue";

const wagerStore = useWagerStore();
const wagerStack = useWagerStackStore();
const selectedEventStore = useSelectedEventStore();
const step = ref(1);
const dailyEvents = useEventStore().getAllEvents();

onMounted(() => {
  selectedEventStore.resetAllSelectedEvents();
});

const addWagers = (events: { id: any; }[]) => {
  try {
    const amount = wagerStack.getAmount();
    let totalWagers = wagerStack.getWagers();
    let totalAmount = 0;

    let i = totalWagers.length;
    let ticketWagers = [];
    events.forEach((item: { id: any; }) => {
      // Account for list of wagers
      totalWagers.forEach((iterWager) => {
        i++;
        ticketWagers.push({
          id: i,
          event_id: item.id,
          event_name: getEventNameAndTime(events.find(c => c.id === item.id)),
          // time: thisEvent.event_time,
          game_id: getGameId(iterWager),
          wager: iterWager,
          amount: amount,
        });
        totalAmount += amount;
      })
    })
    let currentWagers = wagerStore.getWager();
    wagerStore.setWager(ticketWagers.concat(currentWagers));
    wagerStore.setSelectedEvents([]);
    selectedEventStore.resetAllSelectedEvents();
    wagerStack.resetWagerStack();
    step.value = 1;
  } catch(e) {
    console.log(e);
  }

}

const getGameId = (str: string) => {
  let game_id: number;

  switch (str) {
    case  str.match(/\d{3}-\w{3}/)?.input:
      game_id = 3;  // Triple con signo
      break;
    case  str.match(/\d{2}-\w{3}/)?.input:
      game_id = 4;  // Terminal con signo
      break;
    case  str.match(/\d{3}/)?.input:
      game_id = 1;  // Triple
      break;
    case  str.match(/\d{2}/)?.input:
      game_id = 2; // Terminal
      break;
  }
  return game_id;
}

const next = () => {
  step.value = 2;
}
const previous = () => {
  step.value = 1;
}

</script>

<template>
  <div class="card">
    <div class="windowTitle">Triples y Terminales</div>
    <div class="flex justify-content-around flex-wrap">
      <div class="keypad" v-if="step===1">
        <Keypad @next="next"/>
      </div>
      <div class="keypad" v-if="step===2">
        <ProductsTable
            @addWagers="addWagers"
            @previous="previous"
        />
      </div>
    </div>
<!--    <pre>{{ wagerStack.getWagers()}}</pre>-->
<!--    <pre>{{ wagerStore.getWager()}}</pre>-->
  </div>
</template>

<style scoped lang="scss">

.disabledbuttons {
  pointer-events: none;
  opacity: 0.4;
}

.keypad {
  border: solid var(--primary-color) 4px;
  border-radius: 15px;
  padding: 3px;
  margin: 20px;
  width: 327px;
  height: 472px;
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
</style>
