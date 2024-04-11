<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const userName = ref(null);
const pass = ref(null);
const chkCerrarSesion = ref(false);

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Componentes',
        items: [
            { label: 'Login', icon: 'pi pi-fw pi-check-square', to: '/auth/login' },
            { label: 'Landing', icon: 'pi pi-fw pi-id-card', to: '/landing' }
        ]
    }
]);
</script>

<template>
    <!--  
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <Div></Div>
    </ul> -->

    <div class="card"  style="background-color:#F1F1F1" >
    
    <div class="flex flex-column gap-1">
     <table> <td class="font-medium mr-3 text-sm align-left-center text-color:#A4A4A4"> Iniciar sesión</td>
             <td class="text-xs text-right  font-bold text-color:#052C65">Crear cuenta</td>   
     </table>
        <InputText id="username" v-model="userName" aria-describedby="username-help" />
        <div class="jflex justify-content-between  align-self-stretch" ><Password v-model="pass" aria-setsize="10"   :feedback="false"/> 
         <Button label="Entrar" size="20"/> </div>
       <InputGroup>
     
       <table>
       <td class="text-xs text-color:#AFA8A8 font-light"><Checkbox v-model="chkCerrarSesion" :binary="true"/> No cerrar sesión</td>
       <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
       <td class="text-xs text-righ  font-light underline text-color:#AFA8A8">Recordar contraseña</td>
       </table>
  </InputGroup>
  <div> <Button size="200" icon="pi pi-google" label="Continuar con Google"  severity="secondary" outlined @click="poner_url_google_auth"  rounded/> </div>
 
   </div>
 </div>

</template>

<style lang="scss" scoped></style>
