<script setup lang="ts">
import {onMounted, ref} from "vue";
import MainService from "../services/MainService";
import AppMenuItem from './AppMenuItem.vue';
import {useCookies} from "vue3-cookies";
import {useUserStore} from "@/store/modules/user";
import {logout} from "@/utils/general";


const balance = ref(0);
onMounted(async () => {
  balance.value = useUserStore().getUser()?.total_balance;
})

const toggleTheme = () => {
  let theme = useCookies().cookies.get('theme');
  theme = theme ? theme : 'light';
  const res = (theme === 'light' || theme === null) ? 'dark' : 'light';
  changeTheme(res)
}

const changeTheme = (theme) => {
  const elementId = 'theme-css';
  const linkElement = document.getElementById(elementId);
  const cloneLinkElement = linkElement.cloneNode(true);
  cloneLinkElement.setAttribute('id', elementId + '-clone');
  cloneLinkElement.setAttribute('href', `/themes/${theme}/theme.css`);
  cloneLinkElement.addEventListener('load', () => {
    linkElement.remove();
    cloneLinkElement.setAttribute('id', elementId);
  });
  linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  theme = (theme !== null) ? theme : 'light';
  useCookies().cookies.set('theme', theme, "1h");
};

const model = ref([
  {
    label: 'Panel',
    items: [
      {label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'},
      {label: 'Tickets', icon: 'pi pi-fw pi-ticket', to: '/historial'},
      {
        label: 'Juegos',
        icon: 'pi pi-fw pi-star',
        items: [
          {label: 'Triples & Terminales', to: '/loteria'},
          {label: 'Animalitos', to: '/animalitos',}
        ]
      },
      {label: 'Resultados', icon: 'pi pi-fw pi-book', to: '/resultados'},
    ]

  },
  {
    label: 'Billetera',
    items: [
      {label: 'Ingresar Dinero', icon: 'pi pi-fw pi-wallet', to: '/fondos'},
      {label: 'Cobrar Ganancias', icon: 'pi pi-fw pi-money-bill', to: '/ganancias'},
    ]
  },


  {
    label: 'Configuración',
    items: [
      {label: 'Perfil', icon: 'pi pi-fw pi-user', to: '/perfil'},
      {
        label: 'Tema',
        icon: 'pi pi-fw pi-palette',
        command: () => {
          toggleTheme()
        }
      },
    ]
  },
  {
    label: 'Ayuda',
    items: [
      {label: 'Contáctanos', icon: 'pi pi-fw pi-user', to: '/contacto'},
      {label: 'Preguntas Frecuentes', icon: 'pi pi-fw pi-question-circle', to: '/preguntas'},
      {label: 'Términos y Condiciones', icon: 'pi pi-fw pi-list', to: '/terminos_y_condiciones'},
      {label: 'Política de privacidad', icon: 'pi pi-fw pi-shield', to: '/politicas'},
    ]
  },
  {
    label: 'Sesión',
    items: [
      {
        label: 'Salir', icon: 'pi pi-fw pi-sign-out', command: () => {
          logout();
        }
      },
    ]
  },

]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
      <Divider/>
    </template>
  </ul>


</template>

<style lang="scss" scoped>


</style>
