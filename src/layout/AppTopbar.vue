<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import {useLayout} from '@/layout/composables/layout';
import {useRouter} from 'vue-router';
import {useCookies} from 'vue3-cookies'
import {useUserStore} from "@/store/modules/user";
import Logo from "@/layout/composables/Logo.vue";
import {formatCurrency} from "@/utils/general";
import app from "@/utils/app";
import {useWagerStore} from "@/store/modules/wager";
import UserService from "@/services/UserService";
import {delay} from "@/utils/time.ts";


</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <Logo/>
    </router-link>

  </div>
</template>
