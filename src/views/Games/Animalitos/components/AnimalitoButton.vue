<script setup lang="ts">

import {getAnimalito} from "@/utils/animalitos";


interface Props {
  animalitoIndex: number;
}
const props = defineProps<Props>()
const emit = defineEmits(['addInput'])
const addInput=()=> {
  emit('addInput', props.animalitoIndex);
}
</script>

<template>

  <Button
        class="animalitoButton"
          @click="addInput"
          :style="`background: url('/images/animalitos/${getAnimalito(props.animalitoIndex)}.png') no-repeat; background-size:cover;`"
  />
</template>

<style scoped lang="scss">
.animalitoButton{

  margin: 10px;
  padding: 10px;
}
</style>