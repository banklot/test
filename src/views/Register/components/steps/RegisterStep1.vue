<script setup xmlns="http://www.w3.org/1999/html">

import {useRegisterStore} from "@/store/modules/register";
import {onMounted, ref} from "vue";
import {Field, Form} from 'vee-validate';
import * as Yup from 'yup';
import ProgressIcons from "@/views/Register/components/ProgressIcons.vue";

const storeStep = useRegisterStore();
// Variables
const email = ref();
const password = ref();
const confirm_password = ref();

onMounted(() => {
  // Retrieve values
  if (storeStep.getEmail())
    email.value = storeStep.getEmail()
  if (storeStep.getPassword())
    password.value = storeStep.getPassword()
  if (storeStep.getPassword())
    confirm_password.value = storeStep.getPassword()
})
const saveData = () => {
  storeStep.setEmail(email.value)
  storeStep.setPassword(password.value)
  storeStep.setPassword(confirm_password.value)
}
const next = () => {
  saveData()
  storeStep.setRegisterStep(2)
}

const schema = Yup.object().shape({
  email: Yup.string()
      .required('Campo obligatorio')
      .email('Correo electrónico invalido'),
  password: Yup.string()
      .required('Campo obligatorio')
      .min(6, 'Minimo 6 caracteres'),
  confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'La contraseña de verificación no coincide')
      .required('Campo obligatorio')
});

function onSubmit() {
  next()
}
</script>

<template>
  <ProgressIcons sorted="[1]"/>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit" class="w-full">
    <div class="p-fluid formgrid grid">

      <div class="field col-12">

        <Field v-model="email" name="email" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Correo electrónico</label>
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

        <Field v-model="password" name="password" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Contraseña</label>
            <InputText
                v-bind="field"
                type="password"
                class="inputBox"
                :class="{ 'p-invalid': errorMessage }"
            />
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>
      <div class="field col-12 md:col-6">

        <Field v-model="confirm_password" name="confirm_password" v-slot="{ field, errorMessage }">
          <div class="field">
            <label class="label">Confirmar contraseña</label>
            <InputText
                v-bind="field"
                type="password"
                class="inputBox"
                :class="{ 'p-invalid': errorMessage }"
            />
            <small class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
      </div>
      <div class="field col-12">
        <div class="flex justify-content-end">
          <div class="form-group">
            <Button type="submit" icon="pi pi-arrow-right" class="h-3rem w-5rem"/>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<style>
Form {
  width: 100px;
}
</style>