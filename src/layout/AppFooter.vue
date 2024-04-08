<script setup>
import moment from "moment-timezone";
import Logo from "@/layout/composables/Logo.vue";
import {getVzlanTime} from "@/utils/time";

let caracasTime = moment().tz("America/Caracas");

</script>

<template>

    <div class="layout-footer justify-content-center flex-wrap ">
      <div>
        <Logo height="20" class=""/>
      </div>
      <!-- <div class="theDate ">
        {{ caracasTime.format('D/M/Y') }}
      </div>
      &nbsp&nbsp&nbsp
    
      <div class="theTime">

        {{ getVzlanTime() }}
      </div>

      <span class="font-medium ml-2"></span>

        {{ caracasTime.format('HH:MM:SS A') }}
      </div> -->

    </div>
    

</template>
<style lang="scss" scoped>

.footer {
  // background-color: red !important;
}

.theDate {
  color: black;
  font-weight: bold;
}

.theTime {
  color: black;
  font-weight: bold;

}
</style>
