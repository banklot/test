<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import Zodiac from "./Zodiac/ZodiacKeypad.vue";
import {useWagerStore} from "@/store/modules/wager";
import {useWagerStackStore} from "@/store/modules/wagerStack";
import WagerList from "./WagerList.vue";
import {useAppStore} from "@/store/modules/app";
import {getPermutations} from "@/utils/general";


const wagerInput = ref('');
const wagerStack = ref();

const amount = ref(0);
const wagerLength = ref(0);
const chosenGame = ref();
const op = ref();
const wagerRef = ref();
const wagerStore = useWagerStore();
const wagerStackStore = useWagerStackStore();

const wagers = ref([]);

// State variables
const isNextStepValid = computed((): boolean => amount.value > 0 && isWagerValid.value && amount.value > 0 || (wagerStackStore.getWagers().length > 0 && amount.value > 0 && (wagerLength.value >= 2 || wagerLength.value === 0)));
const isWagerValid = computed((): boolean => wagerLength.value >= 2 || wagerLength.value === 6 || wagerLength.value === 7);
const isSignValid = computed((): boolean => wagerLength.value >= 2 && wagerLength.value < 4);
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
    setLabel();
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
  if (newWager.indexOf("*") !== -1) {
  for(let i=0; i<10; i++) {
    let multiplier = newWager.replace("*", String(i));
    wagerStack.value.push(multiplier);
  }  
  wagerStackStore.setWagers(wagerStack.value);
  chosenGame.value = null;

  } else if (wagerStack.value.indexOf(newWager) == -1 && newWager !== "") {
    wagerStack.value.push(newWager);
    wagerStackStore.setWagers(wagerStack.value);
    chosenGame.value = null;
  }
  wagerInput.value = '';
  wagerLength.value = 0;
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
  if (Number.isNaN(value) && event.key!=='*') {
    return;
  }

  if (isMaxWagerLength.value) {
    return;
  }
  addInput(event.key);
}

const addZodiacInput = (sign: string) => {
  focusInput();
  addInput(sign);
}

const addInput = (tInput: string | number) => {
  if (tInput === 'enter') {
    wagerStackStore.setStep(2);
    wagerStackStore.setAmount(amount.value);
    // wagerStack.value.push(wagerInput.value);
    addWagerToList(wagerInput.value);
    wagerStackStore.setWagers(wagerStack.value);
    amount.value = 0;
    wagerInput.value = '';
    wagerLength.value = 0;
    chosenGame.value = '';
    wagerStore.setSelectedEvents([]);
    useAppStore().setFrom('lottery')
    emit('next');
  } if (tInput === 'p') {
    const w = getPermutations(wagerInput.value)
    w.forEach((item)=> {
      addWagerToList(item)
    })
  } else if (wagerLength.value < 6) {
    wagerInput.value = wagerInput.value + tInput.toString();
    wagerLength.value = wagerInput.value.length;
    setLabel()
  }
  op.value.visible = false;
}

const deleteInput = () => {
  if (isNaN(Number(wagerInput.value.slice(-1)))) {
    // It's a sign
    wagerInput.value = wagerInput.value.slice(0, -4);
  } else {
    // It's a number
    wagerInput.value = wagerInput.value.slice(0, -1);
  }
  setLabel();
}

const setLabel = () => {
  wagerLength.value = wagerInput.value ? wagerInput.value.length : 0;
  switch (wagerLength.value) {
    case 2:
      chosenGame.value = 'TERMINAL';
      break;
    case 3:
      chosenGame.value = 'TRIPLE';
      break;
    case 6:
      chosenGame.value = 'TERMINAL CON SIGNO';
      break;
    case 7:
      chosenGame.value = 'TRIPLE CON SIGNO';
      break;
    default:
      break;
  }
}
</script>

<template>
  <!--  <div class="">{{ wagersJoined }}</div>-->
  <div v-focustrap class="buttons">
    <div class="flex justify-content-between">
      <div>
        <div class="flex justify-content-between">
          <div class="chosen-game">{{ chosenGame }}</div>
          <InputText v-model="wagerInput"
                     ref="wagerRef"
                     type="text"
                     class="p-inputtext-lg wage-input" autofocus
                     readonly
                     @keydown="addInputOnKeyPress"
          />
        </div>
        <div class="container">

          <Button class="key" label="1" @click="addInput(1)"
                  :disabled="disabledKeys"/>
          <Button class="key" label="2" @click="addInput(2)"
                  :disabled="disabledKeys"/>
          <Button class="key" label="3" @click="addInput(3)"
                  :disabled="disabledKeys"/>

          <Button class="key" label="4" @click="addInput(4)"
                  :disabled="disabledKeys"/>
          <Button class="key" label="5" @click="addInput(5)"
                  :disabled="disabledKeys"/>
          <Button class="key" label="6" @click="addInput(6)"
                  :disabled="disabledKeys"/>

          <Button class="key" label="7" @click="addInput(7)"
                  :disabled="disabledKeys"/>
          <Button class="key" label="8" @click="addInput(8)"
                  :disabled="disabledKeys"/>
          <Button class="key" label="9" @click="addInput(9)"
                  :disabled="disabledKeys"/>
        </div>
        <div>
<!--          <Button class="key asterisk" label="*" @click="addInput('*')"-->
<!--                  :disabled="disabledKeys"/>-->
          <Button class="key asterisk" label="*" @click="addInput('*')"
                  :disabled="disabledKeys"/>

          <Button class="key" label="0" @click="addInput(0)"
                  :disabled="disabledKeys"/>

          <Button class="key text sign" label="SIGNO" @click="toggle"
                  :disabled="!isSignValid"/>
        </div>
        <InputNumber v-model="amount"
                     :tabindex="1"
                     :inputProps="{tabindex: 0, type: 'tel'}"
                     :min="1"
                     :max="100"
                     showButtons
                     class="wage-amount"
                     @keydown="amountCheck"
                     />

        <Button class="key delete" icon="pi pi-arrow-left" @click="deleteInput()" :disabled="isWagerEmpty"/>
        <!--        style="left: 82px;"/>-->
      </div>
      <div class="side-buttons">
        <!--        <Button class="key delete" icon="pi pi-arrow-left" @click="deleteInput()" :disabled="isWagerEmpty"/>-->
        <WagerList/>
        <Button class="key text" label="PERMUTA" @click="addInput('p');"
                :disabled="!isWagerValid"/>
        <Button class="key text" label="ENTER" @click="addWagerToList(wagerInput);"
                :disabled="!isWagerValid"/>
        <Button class="key text" icon="pi pi-arrow-right" @click="addInput('enter')"
                :disabled="!isNextStepValid"/>
      </div>

    </div>

  </div>

  <OverlayPanel ref="op">
    <Zodiac @addInput="addZodiacInput"/>
  </OverlayPanel>

</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

Button {
  height: 80px;
}

.sign {
 margin-left: 6px;
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

.text {
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
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
  margin-left: 0.1rem;

  &:hover {
    opacity: 0.75;
    background-color: #bb0823;
    //background-color: var(--primary-color);
  }

  &:disabled {
    background-color: gray;
  }
}

.wage-input {
  font-size: xx-large;
  height: 65px;
  width: 226px;
  border-radius: 10px;
  border: solid 2px lightgray;
  margin: 5px;
}

.wage-amount {
  height: 67px !important;
  border: solid 2px lightgray !important;
  border-radius: 7px;
  margin: 2px 6px 4px 2px;
  width: 147px;
}

:deep(.p-component .p-inputnumber-input) {
  width: 100px;
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
  width: 151px;
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
  width: 70px;
}

.asterisk {
  margin-right: 5px;
  font-size: 35px;
  :deep(.p-button-label) {
    margin-top: 7px;
  }
}
</style>

