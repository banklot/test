<script setup lang="ts">

import ZodiacButton from "./ZodiacButton.vue";

const emit = defineEmits(['addInput'])
const addInput = (label) => {
  emit('addInput', label)
}
</script>

<template>
  <div class="zodiac-container">
    <ZodiacButton label="Aries" sign="aries" @addInput="addInput"/>
    <ZodiacButton label="Tauro" sign="taurus" @addInput="addInput"/>
    <ZodiacButton label="Géminis" sign="gemini" @addInput="addInput"/>
    <ZodiacButton label="Cáncer" sign="cancer" @addInput="addInput"/>

    <ZodiacButton label="Leo" sign="leo" @addInput="addInput"/>
    <ZodiacButton label="Virgo" sign="virgo" @addInput="addInput"/>
    <ZodiacButton label="Libra" sign="cancer" @addInput="addInput"/>
    <ZodiacButton label="Escorpio" sign="escorpio" @addInput="addInput"/>

    <ZodiacButton label="Sagitario" sign="sagittarius" @addInput="addInput"/>
    <ZodiacButton label="Capricornio" sign="capricorn" @addInput="addInput"/>
    <ZodiacButton label="Acuario" sign="acuarius" @addInput="addInput"/>
    <ZodiacButton label="Piscis" sign="pisces" @addInput="addInput"/>
  </div>
</template>
<style scoped lang="scss">
.zodiac-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 304px;
}
Button {
  height: 80px;
}
img {
  color: white;
}
.key {
  border: solid 1px black;
  border-radius: 10px;
  font-size: 25px;
  height: 70px;
  width: 70px;
}
</style>
