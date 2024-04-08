<script setup lang="ts">
interface Props {
  sign?: string
  label: string,
}

const props = defineProps<Props>()
const emit = defineEmits(['addInput'])
const addInput = (sign, event: KeyboardEvent = null) => {
  if (event !== null && !(event.code === "NumpadEnter" || event.code === "Enter")) {
    return;
  }
  emit('addInput', "-" + sign.slice(0, 3).toUpperCase())
}
</script>

<template>
<Button class="flex justify-content-center key" autofocus label="1" @click="addInput(sign)" @keydown="event => addInput(sign, event)" >
    <div class="flex flex-column justify-content-center">
      <div class="svg">
        <img :src="'/images/svg/zodiac/'+sign+'.svg'" alt="Logo" style="width: 30px; height: 30px;" class="symbol">
      </div>
      <div class="label">{{ label }}</div>
    </div>
  </Button>
</template>

<style scoped lang="scss">
.label {
  font-size: 12px !important;
  font-weight: 500;
}

.key {
  border: solid 1px black;
  border-radius: 10px;
  font-size: 10px;
  margin: 3px;
  height: 70px;
  width: 70px;
}

.symbol {
  fill: white !important;
}

.svg {
  text-align: center;
}

</style>
