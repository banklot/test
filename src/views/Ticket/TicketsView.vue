<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const itemsVals = [
  {
    label: "Tickets",
    icon: "pi pi-fw pi-book",
    command: () => {
      router.push({"name": "history.games"})
    }
  },
  {
    label: "Transacciones",
    icon: "pi pi-fw pi-wallet",
    command: () => {
      router.push({"name": "history.funds"})
    }
  },
];

const items = ref(itemsVals)

</script>

<template>
  <div class="card" id="cardoverflow" style="width: 100%">
    <div class="windowTitle">Tickets</div>
    <div class="no-card mt-4">
      <TabMenu :model="items"/>
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.p-tabmenu .p-tabmenu-nav {
  border-bottom: 0;
}

.bl-header {
  width: 100%;
  height: 30px;
  position: relative;
}
.bl-bg {
  margin-left: 0.4rem;
  z-index: 0;
  position: absolute;
  width: 200px;
  height: 25px;
  -webkit-transform: skew(160deg);
  -moz-transform: skew(160deg);
  -o-transform: skew(160deg);
  background: rgb(45, 46, 130);
  background: linear-gradient(
          90deg,
          rgba(45, 46, 130, 1) 48%,
          rgba(57, 169, 53, 1) 72%
  );
}
.bl-header h5 {
  position: inherit;
  z-index: 15;
  color: white;
  text-align: justify;
  margin-left: 1.3rem;
  font-weight: bold;
}
@media (max-width: 991px) {
  #cardoverflow {
overflow: scroll;

  }

}
</style>
