<script setup lang="ts">

import moment from "moment-timezone";
import {Field} from "vee-validate";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/modules/user";
import {useToast} from "primevue/usetoast";
import MainService from "../../services/MainService";
import UserService from "@/services/UserService";
import app from "@/utils/app";

const user = ref({});
const email = ref();
const password = ref();
const firstname = ref();
const surname = ref();
const dob = ref();
const role_id = ref();
const status_id = ref();
const phone = ref();
const bank_id = ref();
const document_id = ref();
const nationality = ref();
const stateId = ref();
const municipalityId = ref();
// Options
const banks = ref();
const states = ref();
const municipalities = ref();

const submitted = ref(false);
const toast = useToast();

const userService = new UserService();
const mainService = new MainService()
const storeUser = useUserStore();

onMounted(async () => {
  await getUser()
  // Fetch options
  banks.value = await mainService.getBanks();
  states.value = await mainService.getStates();
  municipalities.value = await mainService.getMunicipalities({state_id: user.value.stateId});
})

const getUser =async () => {
  user.value = await userService.getUser({email: storeUser.getUser().email})
  // Format values
  user.value.dob = moment(user.value.dob, 'YYYY-MM-DD').toDate();
  user.value.stateId = user.value.location.state;
  user.value.municipalityId = user.value.location.municipality;
}

const getMunicipalities = async () => {
  municipalities.value = await mainService.getMunicipalities({state_id: user.value.stateId});
}

const toggleNationality = async () => {
  nationality.value = nationality.value === 'V' ? 'E' : 'V'
}

const saveUser = async () => {
  submitted.value = true;
  if (user.value.email) {
    if (user.value.id) {
      user.value.location = {
        municipality: user.value.municipalityId,
        state: user.value.stateId,
      }
      delete user.value.stateId;
      delete user.value.municipalityId;
      delete user.value.total_balance;
      const response = await userService.updateUser({user: user.value});
      if (response.error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cambios no actualizados | ' + response.error,
          life: 10000
        });
      } else {
        user.value.status = user.value.status.value ? user.value.status.value : user.value.status;
        toast.add({severity: 'success', summary: 'Satisfactorio', detail: 'Cambios actualizados', life: 3000});
      }
    }
  }
  await getUser()
};

</script>

<template>
  <div class="card" id="cardoverflow">
    <Card>
      <template #title> Detalles</template>
      <template #content>
        <!--        <pre>{{ user }}</pre>-->
        <div class="grid">
          <div class="col">
            <Field v-model="user.email" name="email" v-slot="{ field, errorMessage }">
              <div class="field">
                <label class="label">Correo electrónico</label>
                <InputText
                    v-bind="field"
                    type="text"
                    class="inputBox"
                    disabled
                    :class="{ 'p-invalid': submitted && !email }"
                />
                <small class="p-error">{{ errorMessage }}</small>
              </div>
            </Field>
          </div>
        </div>
        <div class="grid">
          <div class="col">
            <Field v-model="user.password" name="password" v-slot="{ field, errorMessage }">
              <div class="field">
                <label class="label">Contraseña</label>
                <InputText
                    v-bind="field"
                    type="password"
                    class="inputBox"
                    placeholder="**********"
                    :class="{ 'p-invalid': errorMessage }"
                />
                <small class="p-error">{{ errorMessage }}</small>
              </div>
            </Field>
          </div>
        </div>

        <hr>

        <div class="grid">
          <div class="col">
            <Field v-model="user.firstname" name="firstname" v-slot="{ field, errorMessage }">
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
          <div class="col">
            <Field v-model="user.surname" name="surname" v-slot="{ field, errorMessage }">
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
        </div>
        <div class="grid">
          <div class="col">
            <Field v-model="user.document_id" name="document_id" v-slot="{ field, errorMessage }">
              <div class="field">
                <label class="label">Cédula</label>
                <div class="p-inputgroup flex-1">
                  <span class="p-inputgroup-addon letter" @click="toggleNationality">{{ user.nationality }}</span>
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
          <div class="col">
            <Field v-model="user.dob" name="dob" v-slot="{ field, errorMessage }">
              <div class="field">
                <label class="label hidden-xs">Fecha de nacimiento</label>
                <label class="label hidden-lg hidden-md hidden-sm">Fecha de nac.</label>
                <Calendar
                    v-model="user.dob"
                    v-bind="field"
                    dateFormat="dd/mm/yy"
                    class="inputBox calendar"
                    :class="{ 'p-invalid': errorMessage }"
                    showIcon/>
                <small class="p-error">{{ errorMessage }}</small>
              </div>
            </Field>
          </div>
        </div>
        <div class="grid">
          <div class="col">
            <Field v-model="user.phone" name="phone" v-slot="{ field, errorMessage }">
              <div class="field">
                <label class="label">Telefono</label>
                <InputMask
                    v-model="user.phone"
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
          <div class="col">
            <Field v-model="user.bank_id" name="bank_id" v-slot="{ value, errorMessage, handleChange }">
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
        </div>
        <div class="grid">
          <div class="col">
            <Field v-model="user.stateId" name="state_id" v-slot="{ value, errorMessage, handleChange }">
              <div class="field">
                <label class="label">Estado</label>
                <Dropdown
                    @update:model-value="handleChange"
                    :model-value="value"
                    :options="states"
                    optionLabel="name"
                    optionValue="id"
                    class="inputBox dropDown"
                    @change="user.municipalityId = null;"
                />
                <small id="email-help" class="p-error">{{ errorMessage }}</small>
              </div>
            </Field>
          </div>
          <div class="col">
            <Field v-model="user.municipalityId" name="municipality_id" v-slot="{ value, errorMessage, handleChange }">
              <div class="field">
                <label class="label">Municipio</label>
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
        </div>
        <div class="flex justify-content-end">
          <Button type="submit"
                  icon="pi pi-arrow-right"
                  @click="saveUser"
                  class="h-3rem w-10rem">Guardar cambios
          </Button>
        </div>

      </template>
    </Card>
  </div>
  <Toast/>
</template>

<style lang="scss" scoped>
//Calendar
:deep .p-calendar-w-btn .p-inputtext {
  background-color: var(--surface-400);
}

:deep .p-button.p-button-icon-only {
  width: 3.357rem
}

:deep .letter {
  width: 3.357rem
}

.dropDown {
  padding: 8px;
}

.calendar {
  border-radius: 25px;
}

.card {
  .p-card {
    box-shadow: unset;
  }

  //padding: 20px;
}
@media (max-width: 991px) {
  #cardoverflow {
overflow: scroll;

  }

}

</style>
