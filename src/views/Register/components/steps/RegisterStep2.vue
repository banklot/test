<script setup xmlns="http://www.w3.org/1999/html">

import {useRegisterStore} from "@/store/modules/register";
import {onMounted, ref} from "vue";
import {Field, Form} from 'vee-validate';
import * as Yup from 'yup';
import ProgressIcons from "@/views/Register/components/ProgressIcons.vue";
import { formatDateStandard} from "@/utils/general";
import moment from "moment-timezone";
import {usePrimeVue} from "primevue/config";
import {useCookies} from "vue3-cookies";
import {formatDate} from "@/utils/time";


const storeStep = useRegisterStore();
// Variables
const firstname = ref();
const surname = ref();
const document = ref();
const nationality = ref('V');
const dob = ref();
const minDate = ref();
const maxDate = ref();
const primevue = usePrimeVue();
const ssoInfo = ref(0);

primevue.config.locale.accept = "Aceptar";
primevue.config.locale.reject = "Rechazar";
primevue.config.locale.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
primevue.config.locale.dayNamesMin = ["Do", "Lu", "Ma", "Mi", "Ju", "Vr", "Sa"];


onMounted(() => {
  // Retrieve values
  if (storeStep.getFirstname())
    firstname.value = storeStep.getFirstname()
  if (storeStep.getSurname())
    surname.value = storeStep.getSurname()
  if (storeStep.getDocument())
    document.value = storeStep.getDocument()
  if (storeStep.getNationality())
    nationality.value = storeStep.getNationality()
  if (storeStep.getDob())
    dob.value = formatDate(storeStep.getDob())

  // Must be over 18 years old to be able to register
  maxDate.value = moment().locale('es').subtract(18, 'years').toDate()
  minDate.value = moment('1910-01-01').toDate();

  ssoInfo.value = Number(useCookies().cookies.get('sso-info'));
})
const saveData = () => {
  storeStep.setFirstname(firstname.value)
  storeStep.setSurname(surname.value)
  storeStep.setDocument(document.value)
  storeStep.setNationality(nationality.value)
  storeStep.setDob(formatDateStandard(dob.value))
}
const next = () => {
  saveData()
  storeStep.setRegisterStep(3)
}
const previous = () => {
  saveData()
  storeStep.setRegisterStep(1)
}

const schema = Yup.object().shape({
  firstname: Yup.string()
      .required('Campo obligatorio')
      .min(2, 'Minimo 2 caracteres'),
  surname: Yup.string()
      .required('Campo obligatorio')
      .min(2, 'Minimo 2 caracteres'),
  document: Yup.string()
      .required('Campo obligatorio')
      .min(5, 'Minimo 5 caracteres'),
  dob: Yup.string()
      .required('Campo obligatorio')
});
const toggleNationality = async () => {
  nationality.value = nationality.value === 'V' ? 'E' : 'V'
}

function onSubmit() {
  next()
}
</script>

<template>
  <ProgressIcons sorted="[1, 2]"/>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit" class="w-full">
    <div class="p-fluid formgrid grid" >

      <div class="field col-12 md:col-6" >
        <Field v-model="firstname" name="firstname" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Nombre</label>
            <InputText
                v-bind="field"
                type="text"
                class="inputBox"
                :class="{ 'p-invalid': errorMessage }"
            />
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 md:col-6">
        <Field v-model="surname" name="surname" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Apellido</label>
            <InputText
                v-bind="field"
                type="text"
                class="inputBox"
                :class="{ 'p-invalid': errorMessage }"
            />
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 md:col-6">
        <Field v-model="document" name="document" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Cédula</label>
            <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon letter" @click="toggleNationality">
                {{ nationality }}
              </span>
              <InputText
                  v-bind="field"
                  type="text"
                  class="inputBox"
                  :class="{ 'p-invalid': errorMessage }"
              />
            </div>
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12 md:col-6">

        <Field v-model="dob" name="dob" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Fecha de nacimiento</label>
            <Calendar
                v-model="dob"
                v-bind="field"
                dateFormat="dd/mm/yy"
                class="inputBox calendar"
                :class="{ 'p-invalid': errorMessage }"
                showIcon
                :manualInput="false"
                :minDate="minDate" :maxDate="maxDate"
            />
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>

      <div class="field col-12">
        <div class="flex justify-content-between">
          <Button @click="previous" icon="pi pi-arrow-left" class="h-3rem w-5rem" :disabled="ssoInfo!==0"/>
          <Button type="submit" icon="pi pi-arrow-right" class="h-3rem w-5rem"/>
        </div>

      </div>
    </div>
  </Form>

</template>
<style lang="scss" scoped>

:deep .p-calendar-w-btn .p-inputtext {
  background-color: var(--surface-400);
}

:deep .p-button.p-button-icon-only {
  width: 3.357rem
}

:deep .letter {
  width: 3.357rem
}

:deep .p-inputgroup-addon .letter {
  background-color: red !important;
  color: white;
}
</style>
