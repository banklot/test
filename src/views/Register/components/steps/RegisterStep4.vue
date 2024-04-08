<script setup lang="ts">

import {ref} from "vue";
import ProgressIcons from "@/views/Register/components/ProgressIcons.vue";
import AuthService from "@/services/AuthService";
import {useToast} from "primevue/usetoast";
import DialogWelcome from "@/views/Register/components/WelcomeDialog.vue";
import {useRegisterStore} from "@/store/modules/register";
import UserService from "@/services/UserService";
import {useUserStore} from "@/store/modules/user";

const storeStep = useRegisterStore();
// Variables
const accepted = ref()
const contract = ref()

const authService = new AuthService();
const userService = new UserService();

const filePath = "temp/contract.txt";

const toast = useToast();
const showOver = ref(false);
const userStore = useUserStore();

readTextFile(filePath)



function readTextFile(file) {
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        // let allText = rawFile.responseText;
        contract.value = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
}

const previous = () => {
  storeStep.setRegisterStep(3)
}
const closeMe = () => {
  // app.session.logout();
  window.location.href = '/';
}
const createUser = async () => {
  const email = storeStep.getEmail();

  const payload = {
    user: {
      email: email,
      password: storeStep.getPassword(),
      firstname: storeStep.getFirstname(),
      surname: storeStep.getSurname(),
      dob: storeStep.getDob(),
      location: {
        state: storeStep.getState(),
        municipality: storeStep.getMunicipality(),
      },
      role: 1,
      bank_id: storeStep.getBank(),
      document_id: storeStep.getDocument(),
      nationality: storeStep.getNationality(),
      phone: storeStep.getPhone(),
      status: 3
    }
  };

  const response = await authService.register(payload);

  if (response.status === 208) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Ya existe una cuenta con este correo electronico: ${email}`,
      life: 5000
    });
  } else if (response.data.error) {
    toast.add({severity: 'error', summary: 'Error', detail: response.data.error, life: 3150});
  } else {
    // Display message
    showOver.value = true;
    userStore.setUser(response.data.user);
  }

}
</script>

<template>
  <ProgressIcons sorted="[1, 2, 3, 4]"/>

  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Terminos y
    Condiciones</label>
  <textarea
      v-model="contract"
      id="message" rows="9"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="">
        </textarea>
  <div class="flex justify-content-end mt-4 mb-4">
    <input
        id="default-checkbox"
        v-model="accepted"
        type="checkbox" value=""
        class="acceptCheckbox">
    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Acepto los
      términos y condiciones</label>
  </div>

  <div class="flex justify-content-between">
    <Button @click="previous" icon="pi pi-arrow-left" class="h-3rem w-5rem"/>
    <Button @click="createUser" icon="pi pi-arrow-right" class="h-3rem w-10rem" v-if="accepted">
      Crear cuenta
    </Button>
  </div>
  <Toast/>

  <DialogWelcome
      :show="showOver"
      message="Su cuenta ha sido creada exitosamente."
      @close="closeMe"/>

</template>
<style lang="scss">
.acceptCheckbox {
  margin-top: 2px;
}

.registerDialog {
  width: 30vw;
  min-width: 300px;
}

.welcomeButton {
  width: 100% !important;
  padding: 7px;
}
</style>
