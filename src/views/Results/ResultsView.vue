<script setup lang="ts">

import {ref, onMounted} from "vue";
import {FilterMatchMode, FilterOperator} from "primevue/api";
import {getDaysAgoDate, getTodayDate} from "@/utils/general";
import GamingService from "@/services/GamingService";
import {formatDate, convertUTCtoVzla, formatTime2} from "@/utils/time";
import {getGameProducts} from "@/utils/variables";

const results = ref();
const loading = ref(false);
const gamingService = new GamingService();
const selectedProduct = ref();
const products = ref();

const gameProducts = getGameProducts();

onMounted(async () => {
  loading.value = true;
  products.value = await gamingService.getProducts()
  await getResults(undefined)

  loading.value = false;
});

const getResults = async (product_id) => {
  results.value = [];
  const request = {
    filter: {
      between_created_at: [getDaysAgoDate(30), getTodayDate()],
    },
    sort: {
      event_timestamp: "desc",
    },
  }
  if (product_id) {
    request.filter["game_product_id"] = product_id
  }
  results.value = await gamingService.getResults(request);
}
const getLogo = (product) => {
  const logo = getGameProducts().find(c=>c.name === product).logo
  return `/images/products/${logo}`
}
</script>

<template>
  <div class="card" id="cardoverflow">
    <div class="windowTitle mb-4">Resultados</div>

<!--    <pre>{{gameProducts[2]}}</pre>-->
    
  </div>
</template>
<style lang="scss" scoped>

#cardoverflow {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardresults {
  display: flex;
  flex-wrap: true;
  width: 430px;
  // height: 100px;
  margin-bottom: 1.3rem;
  background-color: var(--surface-b);
  // padding: 0.5rem;
  // justify-content: start;
  border-left: solid 0.4em;

}

.resultlogo {
  width: 20rem;

  img {
    display: flex;
    margin-top: 0;
    max-width: 11rem;
    max-height: 8rem;
    padding-left: 2rem;

  }
}

.time {
  font-size: small;
  font-weight: lighter;
  padding-top: 2rem;
  padding-bottom: 0rem;
  margin-top: 0.1rem;

}

.result {
  font-size: large;
  font-style: italic;

}

.lista {
  font-size: small;
  font-weight: lighter;
  font-style: italic;

}

.resulttext {
  text-align: start;
  padding-left: 3rem !important;
  font-size: larger;
  font-weight: bold;


}

@media (max-width: 991px) {
  #cardoverflow {
    overflow: scroll;
  }
  .cardresults {
    display: flex;
    width: 368px;
    margin-left: 0rem;
  }
}

.resulttext {
  text-align: start;
  padding-left: 6rem;
  font-size: 1.1em;
  font-weight: bold;
}

.product-filter {
  width: 433px;
  margin-bottom: 10px;
}
:deep(.p-inputtext) {
  font-size: 1rem;
}
</style>
