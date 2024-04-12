<script setup>
import { ref } from 'vue';
const userName = ref(null);
const pass = ref(null);
const chkCerrarSesion = ref(false);

</script>


<template>
  
  <div class="card pl-3 pr-3"  style="background-color:#F1F1F1"   >
    
   <table calss="flex pt-0 flex flex-row flex-wrap">
      <td class="flex align-left font-medium  p-1 pr-7 text_ttl_sm"> Iniciar sesión</td>
      <td class="text-xs align-text-right text_ttl_in_sm"  >Crear cuenta</td>   
   </table> 
      <div class="flex justify-content-between align-self-stretch p-0 " ><InputText class="inp_text" id="username" v-model="userName" aria-describedby="username-help" /></div>
       <div class="flex align-self-stretch p-0 pt-1 pb-1"><InputText id="password" v-model="pass" /><Button  class="flex flex-wrap  align-self-stretch pl-3 btn_submit"  label="ENTRAR"/> </div>
      <InputGroup>
      <table  class="flex flex-row flex-wrap">
        <td class="flex text-xs pr-3 font-light align-self-stretch font-ligth pr-0 text-color: rgb(164, 159, 159)"><Checkbox v-model="chkCerrarSesion" :binary="true"/>Cerrar sesión</td>
        <td class="flex text-xs text-align:right align-self-stretch font-light underline text-color:#AFA8A8">Recordar contraseña</td>   
     </table> 

      </InputGroup>
 <div class="flex flex-row flex-wrap"  pt-2> <Button  class=" btn_submit_google" icon="pi pi-google" label="Continuar con Google"    outlined @click="poner_url_google_auth"  rounded/> </div>
</div>
<div  class="flex flex-row flex-wrap pl-4 pr-2" pt-0>
  <Button class="btn_gradient pr-1 g-6"  label=" Jugar Triples y terminales "/>
  <Button class="div_gray "  label=" Triple Caliente > "/>
  <Button class="div_gray pr-1 g-6"  label=" Triple Zulia > "/>
  <Button class="div_gray pr-1 g-6"  label="Triple Zamorano > "/>
   <Button class="div_gray pr-1 g-6"  label="Triple Caracas >"/>
   <Button class="div_gray pr-1 g-6"  label="Triple Tachira >"/>
  <Button class="btn_gradient"  label=" Jugar con Animalitos "/>
</div>


</template>
<style scoped>
#password{
 width:8rem;
 font-size: 0.7rem;
 padding: 0.3rem;
}
#width_boton{
  width:4.5rem;
}
 .btn_submit_google{
  color: rgb(164, 159, 159);
  background: rgb(256, 256, 256);
  border: 1px solid rgb(134, 133, 133);
  font-size: 0.8rem;
  padding: 0.5rem 3rem;
 }

.text_ttl_sm{
  color: #A4A4A4;
   font-family: Arial, Helvetica, sans-serif;
  font-size: 0.6rem;
  font-weight: 100;
  }

  .text_ttl_in_sm{
  color: #1F5C94;
   font-family: Arial, Helvetica, sans-serif;
   font-weight: bold;

   }

.btn_submit{
  color: rgb(256, 256, 256);
  background: rgb(31, 92, 148);
  border: 1px solid rgb(134, 133, 133);
  font-size: 0.8rem;
   }

   .btn_gradient{
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,81,121,1) 52%, rgba(10,154,184,1) 100%);
    font-size: 0.7rem;
    width:16rem;
    padding: 0.3rem;
   }
   .btn_submit_gray{
  color: rgb(161, 159, 164);
  background: rgb(219, 219, 219);
  border: 1px solid rgb(109, 107, 107);
  font-size: 0.8rem;
  padding: 0.5rem 7rem;
  font-weight: bold;
 }
 .div_gray{
  color: rgb(161, 159, 164);
  background: rgb(219, 219, 219);
  border: 1px solid rgb(109, 107, 107);
  font-size: 0.7rem;
  width:16rem;
  padding: 0.3rem;
 }
 .inp_text{
   font-size: 0.7rem;
  width:13rem;
  padding: 0.3rem;
 }

</style>  