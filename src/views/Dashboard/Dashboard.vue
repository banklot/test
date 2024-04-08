<script setup>
import app from "@/utils/app";

import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/modules/user";
import {useCookies} from "vue3-cookies";
import {getTodayDate} from "@/utils/general";
import {useEventStore} from "@/store/modules/event";
import {organiseProductsByTimeOfTheDay} from "@/utils/time";
import GamesButton from "@/views/Dashboard/components/GamesButton.vue";
import UserService from "@/services/UserService";
import GamingService from "@/services/GamingService";

const userService = new UserService();
const gamingService = new GamingService();

const user = ref({});
const events = ref();
const userStore = useUserStore();
const eventStore = useEventStore();
const cookies = useCookies().cookies;

onMounted(async () => {
  if (userStore.getUser() === null) {
    try {
      if (app.session.getEmail() == null) {
        app.session.logout();
      }
      // Get user info and store in Vuex
      user.value = await userService.getUser({
        email: app.session.getEmail()
      });
      if (!user.value || user.value.keys().length === 0) {
        app.session.logout();
      }
      userStore.setUser(user.value);
      cookies.remove('email');
    } catch (err) {
      console.error("unable to retrieve user information", err);
      return;
    }
  }

  try {
    await refreshBalances(userStore.getUser());
    // Fetch events of the day and store them in Vuex
    events.value = await gamingService.getEvents({
      filter: {
        event_timestamp: getTodayDate(),
      },
      sort: {
        event_timestamp: "asc",
        display_order: 1,
        list_id: 1
      }
    });
    if (!events.value) {
      console.return;
    }
    events.value = organiseProductsByTimeOfTheDay(events.value);
    eventStore.setEvent(events.value);
  } catch (err) {
    console.error("unable to get daily events", err);
  }
})

const refreshBalances = async (user) => {
  const response = await userService.refreshBalance({user_id: user.id});
  if (response.total_balance) {
    user.total_balance = response.total_balance;
  }
  if (response.total_gains) {
    user.total_gains = response.total_gains;
  }
}
</script>
<template>

  <div class="card">
    <div class="flex justify-content-between mb-5">
    </div>
    <div class="buttons">
      <router-link to="/loteria">
        <GamesButton title="Triple" subtitle="¡Juega ya!" color=""/>
      </router-link>
      <router-link to="/loteria">
        <GamesButton title="Terminal" subtitle="¡Juega ya!" color=""/>
      </router-link>
      <router-link to="/animalitos">
        <GamesButton title="Animalitos" subtitle="¡Juega ya!" color=""/>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
