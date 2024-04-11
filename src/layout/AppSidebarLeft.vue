<script setup>
import { ref } from 'vue';
const userName = ref(null);
const pass = ref(null);
const chkCerrarSesion = ref(false);

</script>


<template>
  
  <div class="card"  style="background-color:#F1F1F1" >
    
   <div class="flex flex-column gap-1">
    <table> <td class="font-medium mr-3 text-sm align-left-center text-color:#A4A4A4"> Iniciar sesión</td>
            <td class="text-xs text-right  font-bold text-color:#052C65">Crear cuenta</td>   
    </table>
      <div class="flex justify-content-between align-self-stretch p-0" ><InputText id="username" v-model="userName" aria-describedby="username-help" /></div>
       <div class="flex justify-content-between align-self-stretch p-0" >
        <InputText id="password" v-model="pass" />
       <Button id="width_boton" label="Entrar"/> </div>
      <InputGroup>
    
      <table>
      <td class="text-xs text-color:#AFA8A8 font-light"><Checkbox v-model="chkCerrarSesion" :binary="true"/> No cerrar sesión</td>
      <td class="text-xs text-righ  font-light underline text-color:#AFA8A8">Recordar contraseña</td>
      </table>
 </InputGroup>
 <div> <Button size="200" icon="pi pi-google" label="Continuar con Google"  severity="secondary" outlined @click="poner_url_google_auth"  rounded/> </div>

  </div>
</div>

</template>
<style scoped>
#password{
 width:8rem;
}

#width_boton{
  width:3rem;
}
</style>  