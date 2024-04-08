<script setup lang="ts">

interface Props {
  number?: string
  title: string,
  subtitle: string,
  color: string,
}

const props = defineProps<Props>()

</script>

<template>
  <div class="main">
    <div class="outer">
      <div class="inner" :style="{'border-color':color}">
        <div class="content">
          <div class="title-content">
            <div class="title">{{ title }}</div>
            <div class="subtitle">{{ subtitle }}</div>
          </div>
          <div style="background-color: white;">
            <div class="dd" style="background-image: url(/images/products/zulia.png);"></div>
            <div class="dd" style="background-image: url(/images/products/caracas.png);"></div>
            <div class="dd" style="background-image: url(/images/products/zamorano.png);"></div>
            <div class="dd" style="background-image: url(/images/products/caliente.png);"></div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.title {
  color: #2d2e82 !important;
}

.outer {
  margin: 10px;

  border-radius: 10px;
  padding: 11px;
  border: solid 1px lightgray;
  width: 280px;
  height: 140px;
  box-shadow: 10px 10px 5px lightgray;
  //box-shadow: rgba(14, 30, 37, 0.12) 0 2px 4px 0, rgba(14, 30, 37, 0.32) 0 2px 16px 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0) 49.9%, rgba(228, 228, 228, 1) 50.1%);

  &:hover {
    background: linear-gradient(to bottom right, rgba(228, 228, 228, 1) 49.9%, rgba(255, 255, 255, 0) 50.1%);
    cursor: pointer;

z
    .title {
      color: #2d2e82;
      font-size: 45px;
      font-weight: bold;
    }
  }
}

.inner {
  border-radius: 11px; //        OuterBorderRadius - borderWidth
  border: solid 10px; //#f84d68;
  height: 100%;
}

.content {
  display: flex;
  height: 100%;
}

.title-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title {
  //color: white;
  font-size: 40px;
  font-weight: bold;
  font-family: system-ui;
  margin: 0 5px 0 8px;
  color: var(--text-color);
}

.subtitle {
  font-size: 15px;
  font-weight: bold;
  font-family: system-ui;
  margin: 0 5px 0 8px;
  color: #7b7b7b;
}

.dd {
  background-color: red !important;
  //opacity: 30%;
  filter: invert(0.30);
  background-size: 260px 240px;
  cursor: pointer;
}
</style>
