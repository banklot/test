<script setup xmlns="http://www.w3.org/1999/html">
import {useRegisterStore} from "@/store/modules/register";
import {onMounted, ref} from "vue";
import {Field, Form} from 'vee-validate';
import * as Yup from 'yup';
import GoogleButton from "@/views/Login/components/GoogleButton.vue";
// import FacebookButton from "@/views/Login/components/FacebookButton.vue";
import AuthService from "@/services/AuthService";
import {useUserStore} from "@/store/modules/user";
import Logo from "@/layout/composables/Logo.vue";
import app from "@/utils/app";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
import Divider from 'primevue/divider';
// import {LoginResponse} from "@/utils/messages";

const storeStep = useRegisterStore();
// Variables
const email = ref();
const password = ref();

const authService = new AuthService();
const registerDialog = ref(false);
const router = useRouter();
const storeUser = useUserStore();

onMounted(() => {
  // Retrieve values
  if (storeStep.getEmail()) {
    email.value = storeStep.getEmail()
  }
  if (storeStep.getPassword()) {
    password.value = storeStep.getPassword()
  }
  storeUser.setUser({});
});
// const saveData = () => {
//   storeStep.setEmail(email.value)
//   storeStep.setPassword(password.value)
// }

const getStatusString = (status) => {
  switch (status) {
    case 0:
      return "blocked"
    case 1:
      return "pending"
    case 2:
      return "inactive"
    case 3:
      return "active"
  }
  return "";
}

const processLoginResponse = (response) => {
  if (response.error) {
    console.error("processing login user had an error: ", response.error);
    // TODO: Define what to do when there's an ERROR with SSO and not just
    // send them to register
    registerDialog.value = true;
    return;
  }

  switch (getStatusString(response.user.status)) {
    case "blocked":
      console.error("user blocked", response.user.status);
      registerDialog.value = true;
      break;
    case "inactive":

      break;
    case "pending":
      // Save SSO infor and goto step 2 of registration
      useRegisterStore().setEmail(response.ssoInfo.email);
      useRegisterStore().setFirstname(response.ssoInfo.given_name);
      useRegisterStore().setRegisterStep(2);
      useCookies().cookies.set('sso-info', '1');
      router.push({name: 'register'});
      break;
    case "active":
      // Save profile
      storeUser.setUser(response.user);
      app.session.setToken(response.token);
      app.session.dashboard();
      break;
  }
}

const googleConsentWindow = () => {
  const messageKey = "message";
  const targetName = "ssoPopup"
  const windowFeatures = "width=500,height=650";
  window.open(`${window.origin}${app.authGoogle}`, targetName, windowFeatures)

  const messageListener = (event) => {
    // This is a security check, this means that the
    // postMessage did not come the same domain or origin
    // meaning that there could be a man in the middle attack
    if (event.origin !== window.origin) {
      return;
    }

    processLoginResponse(event.data);

    window.removeEventListener(
        messageKey,
        messageListener
    );
  }
  // proxyContent.addEventListener(messageKey, messageListener, false)
  window.addEventListener(
      messageKey,
      messageListener,
      false,
  );
}

async function onSubmit() {
  // Validate credentials with backend
  const response = await authService.login({email: email.value, password: password.value});

  processLoginResponse(response);
}

const schema = Yup.object().shape({
  email: Yup.string()
      .required('Campo obligatorio')
      .email('Correo electrónico invalido'),
  password: Yup.string()
      .required('Campo obligatorio')
      .min(6, 'Minimo 6 caracteres'),
});

</script>
<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
       style="background-image: url('/images/background.png');">
    <div class="logincard card centered" id="cardoverflow">
      <div class="text-left mb-5">
        <!--        <img src="/images/svg/logo.svg" alt="Logo" style="width: 100%; height: auto;">-->
        <Logo style="width: 100%; height: auto;"/>
      </div>
      <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit()" style="width: unset;">
        <div class="p-fluid formgrid grid">
    
          <!--          <div class="field col-12 md:col-6">-->
          <!--            <FacebookButton/>-->
          <!--          </div>-->
          <hr>
          <br>
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
          <div class="field col-12">
            <Field v-model="password" name="password" v-slot="{ field, errorMessage }">
              <div class="field">
                <label class="label">Contraseña</label>
                <!--                <InputText-->
                <!--                    v-bind="field"-->
                <!--                    type="password"-->
                <!--                    class="inputBox"-->
                <!--                    :class="{ 'p-invalid': errorMessage }"-->
                <!--                />-->
                <Password
                    id="password1"
                    v-model="password"
                    v-bind="field"
                    placeholder="Contraseña"
                    :feedback="false"
                    :toggleMask="true"
                    class="inputBox"
                    :class="{ 'p-invalid': errorMessage }"
                />
                <small class="p-error">{{ errorMessage }}</small>
              </div>
            </Field>
            <Button type="submit" label="Ingresar" class="w-full p-3 text-x font-bold logbutton"/>
          </div>
          <p id="textgoogle">O también puedes</p>
          <div class="field col-12 md:col-12">
            <GoogleButton @click="googleConsentWindow()"/>
          </div>
        </div>
      </Form>
      <div class="flex justify-content-between noaccount mb-2">
        <div style="margin-right: 10px;">¿No tiene cuenta todavía?</div>
        <router-link
            to="/registro" class="register-link">Crear una cuenta de GanadorApp
        </router-link>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="registerDialog" modal header="No pudimos conseguir su usuario" style="width: 30vw; min-width: 350px;">
    <p class="warning-message">
      <div class="flex justify-content-center flex-column text-center">
        <Button label="Verificar usuario y/o contraseña" class="w-full p-3 text-x font-bold logbutton"
                @click="registerDialog = false"/>
        <div>o</div>
        <router-link to="/registro" class="register-link">
          <Button label="Crear una cuenta de GanadorApp" class="w-full p-3 text-x font-bold logbutton"/>
        </router-link>
      </div>
    </p>
  </Dialog>

</template>
<style lang="scss">
.warning-message {
  width: 100%;
  font-size: medium;
}

.register-link {
  color: black;
  font-weight: bold;
}

.logincard.logincard.card {
  height: unset;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  max-width: 560px;
  height: 593px !important;
}
#textgoogle {
margin-top: 0rem;
margin-left: auto;
margin-right: auto;
font-size:0.9rem;

  }

#password1{
  border-radius: 25px;
  .p-inputtext {
    background: var(--surface-400) !important;
  }
}
@media (max-width: 528px) {
  #cardoverflow {
height: 100% !important;
width: 100%;
border-radius: 0%;

  }

}

</style>
