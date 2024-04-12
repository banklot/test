<script setup>
import { ref } from 'vue';
const userName = ref(null);
const pass = ref(null);
const chkCerrarSesion = ref(false);

</script>


<template>
  
  <div class="card pl-3 pr-3"  style="background-color:#F1F1F1"   >
    
  
    <table  class="flex align-self-stretch  pt-1 pb-1">
      <td class="flex pr-8 text_ttl_sm  min-width:1.143rem"> Iniciar sesión</td>
      <td class="flex text_ttl_in_sm  "  >Crear cuenta</td>   
   </table>
      <div class="flex justify-content-between align-self-stretch p-0 " ><InputText class="inp_text" id="username" v-model="userName" aria-describedby="username-help" /></div>
       <div class="flex align-self-stretch pr-1 pt-1 pb-1"><InputText id="password" v-model="pass" /><Button  class="flex flex-wrap  align-self-stretch  btn_submit"  label="ENTRAR"/> </div>
      
       <InputGroup>
      <table  class="flex align-self-stretch p-1 pt-1 pb-1">
        <td class="flex pr-7   text_div_sm"><Checkbox v-model="chkCerrarSesion" :binary="true"/>Cerrar sesión</td>
        <td class="flex text_div_sm   underline  ">Recordar contraseña</td>   
     </table> 
      </InputGroup>
 <div class="flex flex-row flex-wrap"  pt-2> <Button  class=" btn_submit_google" icon="pi pi-google" label="Continuar con Google"    outlined @click="poner_url_google_auth"  rounded/> </div>
</div>
<div  class="flex flex-row flex-wrap ">
  <Button class="btn_gradient"  label=" Jugar Triples y terminales "/>
  <Button class="div_gray "  label=" Triple Caliente > "/>
  <Button class="div_gray "  label=" Triple Zulia > "/>
  <Button class="div_gray"  label="Triple Zamorano > "/>
   <Button class="div_gray"  label="Triple Caracas >"/>
   <Button class="div_gray "  label="Triple Tachira >"/>
  <Button class="btn_gradient"  label=" Jugar con Animalitos "/>
</div>
<table  >
 <tr> <td><img src="./../../public/images/triple_caliente.jpeg" width="90" height="90"/>
     <img src="./../../public/images/triple_caracas.jpeg" width="90" height="90"/> 
     <img src="./../../public/images/triple_dorado.jpeg" width="60" height="60"/> </td></tr>
     <tr> <td><img src="./../../public/images/triple_pelotica.jpeg" width="90" height="90"/>
     <img src="./../../public/images/triple_zamorano.jpeg" width="90" height="90"/> 
     <img src="./../../public/images/triple_zulia.jpeg" width="60" height="60"/> </td></tr>
</table>

</template>
<style scoped>
#password{
 width:13rem;
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
  padding: 0.2rem; 
  width:15.5rem;
 }
.table_color{
  background: rgb(164, 159, 159);
  
}

.text_ttl_sm{
  color: #A4A4A4;
   font-family: Arial, Helvetica, sans-serif;
  font-size: 0.6rem;
  font-weight: 100;
   
  }

  .text_div_sm{
  color: #A4A4A4;
   font-family: Arial, Helvetica, sans-serif;
  font-size: 0.6rem;
  font-weight: 100;
   
  }


  .text_ttl_in_sm{
   color: #1F5C94;
   font-family: Arial, Helvetica, sans-serif;
   font-weight: bold;
   font-size: 0.7rem;
  
   }

.btn_submit{
  color: rgb(256, 256, 256);
  background: rgb(31, 92, 148);
  border: 1px solid rgb(134, 133, 133);
  font-size: 0.6rem;
  padding: 0.3rem;
   }

   .btn_gradient{
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(66,170,228,1) 52%, rgba(10,154,184,1) 100%);
    transition: box-shadow 0.20s;
    font-size: 0.7rem;
    width:19rem;
    padding: 0.3rem;
    margin: 0 0 0.3rem 0;
    box-shadow: 0 0 0 0.2rem rgba(160, 162, 163, 0.5); 
    outline: 0 none;
    outline-offset: 0;

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
  border: 0.5px  rgb(109, 107, 107);
  font-size: 0.7rem;
  width:19rem;
  padding: 0.3rem;
  padding: 0.3rem;
    margin: 0 0 0.1rem 0;
    box-shadow: 0 0 0 0.2rem rgba(160, 162, 163, 0.5); 
    outline: 0 none;
    outline-offset: 0;
  }
  
 .inp_text{
   font-size: 0.7rem;
  width:15.5rem;
  padding: 0.3rem;
 }

</style>  