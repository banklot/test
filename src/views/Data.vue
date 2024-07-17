<script setup>
import {onMounted, ref} from "vue";
import ApiService from "@/service/ApiService";

const data = ref();
const apiService = new ApiService();

onMounted(async () => {
  data.value = await apiService.loadData();
})
</script>


<template>
  <div class="card">

    <h2>Datos</h2>
    <pre>{{ data }}</pre>

  </div>

</template>
<style scoped>

</style>
