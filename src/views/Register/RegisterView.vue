<script setup>
import Stepper from "@/views/Register/components/Stepper.vue";
import router from "@/router";
import Logo from "@/layout/composables/Logo.vue";



const goBack = () => {
  router.push('/login');
}

</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
       style="background-image: url(/images/background.png);">
    <div class="card centered " id="cardoverflow">
      <div class="text-left mb-2">
        <Logo style="width: 100%; height: auto;"  @click="goBack"/>
<!--        <pre>{{ useRegisterStore()}}</pre>-->
      </div>
      <Stepper/>
    </div>
  </div>


</template>
<style>

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  max-width: 560px;
  height: 593px;
  @media  (max-width: 780px) {
    height: 100% !important;
  }

  }
  @media (max-width: 991px) {
  #cardoverflow {
overflow: scroll;

  }

}
@media (max-width: 528px) {
  #cardoverflow {
overflow: scroll;
height: 100%;
width: 100%;
border-radius: 0%;

  }

}


</style>
