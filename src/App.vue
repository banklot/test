<script setup>
import {useAppStore} from "@/store/modules/app";
import conf from "@/utils/app";

useAppStore().setApp({
    name: conf.name,
    version: conf.version
})
</script>

<template>
    <router-view />
</template>

<style scoped></style>
