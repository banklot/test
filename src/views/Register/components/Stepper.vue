<script setup>

import {useRegisterStore} from "@/store/modules/register";
import RegisterStep1 from "@/views/Register/components/steps/RegisterStep1.vue";
import RegisterStep2 from "@/views/Register/components/steps/RegisterStep2.vue";
import RegisterStep3 from "@/views/Register/components/steps/RegisterStep3.vue";
import RegisterStep4 from "@/views/Register/components/steps/RegisterStep4.vue";
import {onMounted} from "vue";


const storeStep = useRegisterStore();

onMounted(async () => {
  if (!storeStep.getRegisterStep()){
    storeStep.setRegisterStep(1);
  }

})

</script>

<template>

    <div class="flex justify-content-end">

      <!-- <div class="text-left mb-5">
        <div class="text-900 text-3xl font-medium font-bold mb-3" style="color: black !important;">Crear cuenta</div>
      </div> -->
      <div class="text-sm font-bold">
        REGISTRO {{ storeStep.getRegisterStep() }}/4
      </div>
    </div>

  <div class="">
    <RegisterStep1 v-if="storeStep.getRegisterStep() === 1"/>
    <RegisterStep2 v-if="storeStep.getRegisterStep() === 2"/>
    <RegisterStep3 v-if="storeStep.getRegisterStep() === 3"/>
    <RegisterStep4 v-if="storeStep.getRegisterStep() === 4"/>
  </div>

</template>