<script setup>
import { ref } from 'vue';
const userName = ref(null);
const pass = ref(null);
const chkCerrarSesion = ref(false);

</script>


<template>
  
  <div class="card pl-3 pr-3"  style="background-color:#F1F1F1"   >
    
   <table calss="flex pt-0 flex flex-row flex-wrap">
      <td class="flex align-left font-medium  p-1 pr-4 text-sm text-color:#A4A4A4"> Iniciar sesión</td>
      <td class="text-xs align-text-right  text-color:#052C65">Crear cuenta</td>   
   </table> 
      <div class="flex justify-content-between align-self-stretch p-0" ><InputText id="username" v-model="userName" aria-describedby="username-help" /></div>
       <div class="flex align-self-stretch p-0 pt-1 pb-1"><InputText id="password" v-model="pass" /><Button  class="flex flex-wrap  align-self-stretch pl-3"  label="Entrar"/> </div>
      <InputGroup>
      <table  class="flex flex-row flex-wrap">
        <td class="flex text-xs pr-3 font-light align-self-stretch font-ligth pr-0 text-color:#A4A4A4"><Checkbox v-model="chkCerrarSesion" :binary="true"/>Cerrar sesión</td>
        <td class="flex text-xs text-align:right align-self-stretch font-light underline text-color:#AFA8A8">Recordar contraseña</td>   
     </table> 

      </InputGroup>
 <div class="flex flex-row flex-wrap"> <Button icon="pi pi-google" label="Continuar con Google"  severity="secondary" outlined @click="poner_url_google_auth"  rounded/> </div>
</div>

</template>
<style scoped>
#password{
 width:8rem;
}

#width_boton{
  width:4.5rem;
}
</style>  