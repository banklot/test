<script setup lang="ts">

import {useRegisterStore} from "@/store/modules/register";
import {onMounted, ref} from "vue";
import MainService from "@/services/MainService";
import * as Yup from "yup";
import {Field, Form} from "vee-validate";
import ProgressIcons from "@/views/Register/components/ProgressIcons.vue";

const storeStep = useRegisterStore();
const mainService = new MainService();

// Variables
const banks = ref();
const states = ref();
const municipalities = ref();
// Imputs
const phone = ref();
const bank = ref();
const state = ref();
const municipality = ref();

onMounted(async () => {
  if (storeStep.getPhone())
    phone.value = storeStep.getPhone()
  if (storeStep.getBank())
    bank.value = storeStep.getBank()
  if (storeStep.getState())
    state.value = storeStep.getState()
  if (storeStep.getMunicipality())
    municipality.value = storeStep.getMunicipality()

  // Fetch dropbox data
  banks.value = await getBanks();
  states.value = await getStates();
  municipalities.value = await mainService.getMunicipalities({state_id: state.value})
})
const saveData = () => {
  storeStep.setPhone(phone.value)
  storeStep.setBank(bank.value)
  storeStep.setState(state.value)
  storeStep.setMunicipality(municipality.value)
}
const next = () => {
  saveData()
  storeStep.setRegisterStep(4)
}
const previous = () => {
  saveData()
  storeStep.setRegisterStep(2)
}
const getBanks = async () => {
  return await mainService.getBanks()
}
const getStates = async () => {
  return await mainService.getStates()
}
const getMunicipalities = async () => {
  municipalities.value = await mainService.getMunicipalities({state_id: state.value})
  municipality.value = null;
}

const schema = Yup.object().shape({
  phone: Yup.string()
      .required('Campo obligatorio'),
  bank: Yup.string()
      .required('Campo obligatorio'),
  state: Yup.string()
      .required('Campo obligatorio'),
  municipality: Yup.string()
      .required('Campo obligatorio')
});

function onSubmit() {
  next()
}
</script>

<template>
  <!--  <pre>{{municipalities}}</pre>-->
  <ProgressIcons sorted="[1, 2, 3]"/>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit" class="w-full">
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <Field v-model="phone" name="phone" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Telefono</label>
            <InputMask
                v-model="phone"
                date="phone"
                mask="(0499) 999-9999"
                placeholder="(0499) 999-9999"
                class="inputBox"
                :class="{ 'p-invalid': errorMessage }"
            />
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 md:col-6">
        <Field v-model="bank" name="bank" v-slot="{ value, errorMessage, handleChange }">
          <div class="field">
            <label class="label">Banco</label>
            <Dropdown
                @update:model-value="handleChange"
                :model-value="value"
                :options="banks"
                optionLabel="name"
                optionValue="code"
                class="inputBox dropDown"
            />
            <small id="bank-help" class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 md:col-6">
        <Field v-model="state" name="state" v-slot="{ value, errorMessage, handleChange }">
          <div class="field">
            <label class="label">Estado</label>
            <Dropdown
                @update:model-value="handleChange"
                :model-value="value"
                :options="states"
                optionLabel="name"
                optionValue="id"
                class="inputBox dropDown"
            />
            <small id="email-help" class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 md:col-6">
        <Field v-model="municipality" name="municipality" v-slot="{ value, errorMessage, handleChange }">
          <div class="field">
            <label class="label">Municipio {{ municipality && municipality.value }}</label>
            <Dropdown
                @update:model-value="handleChange"
                :model-value="value"
                :options="municipalities"
                optionLabel="name"
                optionValue="municipality_id"
                class="inputBox dropDown"
                @click="getMunicipalities"
            />
            <small id="email-help" class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 flex justify-content-between">
        <Button @click="previous" icon="pi pi-arrow-left" class="h-3rem w-5rem"/>
        <Button type="submit" icon="pi pi-arrow-right" class="h-3rem w-5rem"/>
      </div>
    </div>
  </Form>
</template>

<style scoped>
.dropDown {
  padding: 8px;
  width: 218px;
}

@media (max-width: 800px) {
  .dropDown {
    width: 100%;
  }
}
</style>