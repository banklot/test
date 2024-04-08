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
      <div class="inner">
        <div class="content">
          <div class="number">{{ number }}</div>
          <div class="separator"></div>
          <div class="title-content">
            <div class="title">{{ title }}</div>
            <div class="subtitle">{{ subtitle }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.outer {
  border-radius: 24px;
  padding: 11px;
  border: solid 1px lightgray;
  height: 100px;
  width: 100%;
  box-shadow: rgba(14, 30, 37, 0.12) 0 2px 4px 0, rgba(14, 30, 37, 0.32) 0 2px 16px 0;
  background: rgb(255,255,255);
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0) 49.9%, rgba(228, 228, 228, 1) 50.1%);

}
.inner {
  border-radius: 13px; // OuterBorderRadius - borderWidth                    (24 - 11 = 16px)
  border: solid 10px #f84d68;
  height: 100%;
}
.content {
  display: flex;
  height: 100%;
}
.number {
  font-size: 40px;
  font-weight: bold;
  font-family: system-ui;
  margin: 5px 5px 0 5px;
}
.separator {
  border-left: solid 1px darkgray;
  margin: 5% 0 5% 0;
}
.title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-size: 15px;
  font-weight: bold;
  font-family: system-ui;
  margin: 3px 5px 0 8px;
}
.subtitle {
  font-size: 8px;
  font-weight: bold;
  font-family: system-ui;
  margin: 0 5px 0 8px;
  color: #7b7b7b;
}
</style>