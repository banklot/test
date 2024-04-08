<script setup lang="ts">

import {computed, onMounted, ref} from "vue";

import {useWagerStore} from "@/store/modules/wager";

import AnimalitoButton from "./AnimalitoButton.vue";
import WagerList from "./WagerList.vue";
import {useWagerStackAnimalitosStore} from "@/store/modules/wagerStackAnimalitos";
import {useAppStore} from "@/store/modules/app";


const wagerInput = ref('');
const wagerStack = ref([]);
const animalito = ref();

const amount = ref(0);
const wagerLength = ref(0);
const chosenGame = ref();
const op = ref();
const wagerRef = ref();
const wagerStore = useWagerStore();
const wagerStackStore = useWagerStackAnimalitosStore();

const wagers = ref([]);

// State variables
const isNextStepValid = computed((): boolean => amount.value > 0 && (wagers.value.length > 0 || isWagerValid.value) || wagerStack.value.length > 0 && amount.value > 0);
const isWagerValid = computed((): boolean => wagerLength.value >= 2 || wagerLength.value === 6 || wagerLength.value === 7);
const isWagerEmpty = computed((): boolean => wagerLength.value < 1);
const disabledKeys = computed((): boolean => wagerLength.value === 3 || wagerLength.value === 6 || wagerLength.value === 7);
const isMaxWagerLength = computed((): boolean => wagerLength.value >= 3)

const emit = defineEmits(['next'])

const toggle = (event: PointerEvent | KeyboardEvent) => {
  op.value.toggle(event);
}

onMounted(() => {
  if (wagerStackStore.getWagers() !== null) {
    amount.value = wagerStackStore.getAmount();
    wagerStack.value = wagerStackStore.getWagers();
    wagerLength.value = wagerInput.value ? wagerInput.value.length : 0;
  }
});

const focusInput = () => {
  try {
    wagerRef.value.$el.focus();
  } catch (e) {
    console.error(`error focusing on wager input: ${e}`);
  }
}

const amountCheck = (event: KeyboardEvent) => {
  const enterCode = (event.code === "NumpadEnter" || event.code === "Enter");

  if (enterCode && amount.value > 0) {
    addInput('enter');
    return;
  }
  return;
}

function addWagerToList(newWager: string) {
  if (wagerStack.value.indexOf(newWager) == -1 && newWager !== "") {
    wagerStackStore.getWagers().push(newWager);
  }
}

const addInputOnKeyPress = (event: KeyboardEvent) => {

  const preventDefaultCodes = ["Backspace", "Delete", "NumpadEnter", "Enter"]

  if (preventDefaultCodes.indexOf(event.code) !== -1 || event.key.length === 1) {
    event.preventDefault();
  }

  if (event.code === "Backspace" || event.code === "Delete") {
    deleteInput();
    return;
  }

  const enterCode = (event.code === "NumpadEnter" || event.code === "Enter");
  // Uncomment if we want to go to the next step from keyboard
  // if (enterCode && amount.value > 0 && wager.value === '') {
  //   addInput('enter');
  //   return;
  // }

  if (enterCode && isWagerValid.value) {
    addWagerToList(wagerInput.value);
    return;
  }
  if (event.key === "-" && isWagerValid.value) {
    toggle(event);
  }
  const value = parseInt(event.key);
  if (Number.isNaN(value)) {
    return;
  }
  if (isMaxWagerLength.value) {
    return;
  }
  addInput(value);
}


const addInput = (tInput: string | number) => {
  if (tInput === 'enter') {
    wagerStackStore.setAmount(amount.value);
    // wagerStack.value.push(wagerInput.value);
    addWagerToList(wagerInput.value);
    wagerStackStore.setWagers(wagerStack.value);
    amount.value = 0;
    wagerInput.value = '';
    wagerLength.value = 0;
    chosenGame.value = '';
    wagerStore.setSelectedEvents([]);
    useAppStore().setFrom('animalitos')
    emit('next');
  } else if (wagerLength.value < 6) {
    addWagerToList(tInput);
    // wagerInput.value = wagerInput.value + tInput.toString();
    // wagerLength.value = wagerInput.value.length;
  }
  // op.value.visible = false;
}

const deleteInput = () => {
  if (isNaN(Number(wagerInput.value.slice(-1)))) {
    // It's a sign
    wagerInput.value = wagerInput.value.slice(0, -4);
  } else {
    // It's a number
    wagerInput.value = wagerInput.value.slice(0, -1);
  }
}

const getDisabledKeys = (): boolean => {
  return !(animalito.value > 0 && amount.value > 0);
}
</script>

<template>
  <!--  <div class="">{{ wagersJoined }}</div>-->
  <div v-focustrap class="buttons">
    <div class="flex justify-content-between">

      <div class="buttons">
        <ScrollPanel ref="scrollPanel" scrollYRatio={0.99} style="width: 100%; height: 381px">
          <div class="container">
            <div v-for="n in 37">

              <AnimalitoButton :class="`key ${n===animalito?'selected':'non-selected'}`"
                               :animalitoIndex="n"
                               @click="addInput(n)"/>
            </div>
          </div>
        </ScrollPanel>

        <div class="flex justify-content-between" style="">
          <!--      <Button class="key delete" icon="pi pi-arrow-left" @click="deleteInput()" :disabled="wagerLength <1"/>-->
          <InputNumber v-model="amount"
                       :min="1"
                       :max="100"
                       showButtons
                       class="wage-amount"/>
          <Button class="key delete" icon="pi pi-arrow-left" @click="deleteInput()" :disabled="isWagerEmpty"/>


        </div>
      </div>


      <div>

        <!--        <Button class="key delete" icon="pi pi-arrow-left" @click="deleteInput()" :disabled="isWagerEmpty"/>-->
        <!--        style="left: 82px;"/>-->
      </div>
      <div class="side-buttons">
        <!--        <Button class="key delete" icon="pi pi-arrow-left" @click="deleteInput()" :disabled="isWagerEmpty"/>-->
        <WagerList/>
        <Button class="tallButtons" label="Enter" @click="addWagerToList(wagerInput);"
                :disabled="!isWagerValid"/>
        <Button class="normalButtons enter" icon="pi pi-arrow-right" @click="addInput('enter')"
                :disabled="!isNextStepValid"/>
      </div>

    </div>

  </div>

</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(3, 0fr);
}

Button {
  height: 80px;
}

.key {
  border: solid 1px black;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  font-size: 25px;
  margin: 3px;
  height: 70px;
  width: 70px;

  &:disabled {
    background-color: gray;
  }
}

.tallButtons {
  border: solid 1px black;
  border-radius: 10px;
  //padding: 20px 20px 20px 26px;
  //font-size: 25px;
  margin: 3px;
  height: 146px;
  width: 70px;

  &:disabled {
    background-color: gray;
  }
}

.normalButtons {
  border: solid 1px black;
  border-radius: 10px;
  //padding: 20px 20px 20px 26px;
  //font-size: 25px;
  margin: 5px 0 0 3px;
  height: 70px;
  width: 70px;

  &:disabled {
    background-color: gray;
  }
}

.enter {
  background-color: #2c9d00;
  font-size: 25px;

  &:hover {
    opacity: 0.75;
    background-color: #2c9d00;
  }

  &:disabled {
    background-color: gray;
  }
}

.delete {
  background-color: #bb0823;
  right: 9px;

  &:hover {
    opacity: 0.75;
    background-color: #bb0823;
    //background-color: var(--primary-color);
  }

  &:disabled {
    background-color: gray;
  }
}

.wage-amount {
  height: 73px !important;
  border: solid 2px lightgray !important;
  border-radius: 7px;
  margin: 2px 9px 4px 2px;
}

.chosen-game {
  position: absolute;
  margin: 10px 0 10px 108px;
  font-size: x-small;
}

.bolitas {
  color: #495057;
  background: #ffffff;
  padding: 0.5rem 0.75rem;
  border: 2px solid #ced4da;
  appearance: none;
  border-radius: 10px;
  width: 226px;
}

.p-inputtext-lg .p-inputtext {
  font-size: 2.25rem;
}

:deep(.p-inputnumber-input) {
  width: 120px;
  font-size: 24px;
}

.buttons {
  width: 100%;
  padding-top: 2px;
}

:deep(.p-disabled) {
  background-color: gray !important;
}

:deep(  .p-inputnumber-button-group) {
  margin-left: -8px !important;
}

.side-buttons {
  display: flex;
  flex-direction: column;
  margin: 5px 5px 5px 0;
  width: 73px;
}

:deep(.p-scrollpanel-content) {
  padding: unset;
}

</style>

