<script setup lang="ts">

import PaymentIcon from "../../../components/icons/PaymentIcon.vue";
import LegalIcon from "../../../components/icons/LegalIcon.vue";
import PersonalIcon from "../../../components/icons/PersonalIcon.vue";
import UserIcon from "../../../components/icons/UserIcon.vue";

defineProps(['sorted'])

</script>

<template>
    <ol class="progressIcons">
        <li class="flex justify-content-between">
            <div class="icons" :class="{ 'is-current': sorted.includes('1') }">
                <UserIcon/>
            </div>
        </li>
        <li class="bar" :class="{ 'is-current': sorted.includes('1') }"/>
        <li class="">
            <div class="icons" :class="{ 'is-current': sorted.includes('2') }">
                <PersonalIcon/>
            </div>
        </li>
        <li class="bar" :class="{ 'is-current': sorted.includes('2') }"/>
        <li class="">
            <div class="icons" :class="{ 'is-current': sorted.includes('3') }">
                <PaymentIcon/>
            </div>
        </li>
        <li class="bar" :class="{ 'is-current': sorted.includes('3') }"/>
        <li class="">
            <div class="icons" :class="{ 'is-current':sorted.includes('4') }">
                <LegalIcon/>
            </div>
        </li>
    </ol>
</template>

<style lang="sass">
.progressIcons
    width: 100%
    list-style: none
    display: flex
    padding-right: 50px
    margin-bottom: 30px

.icons
    width: 46px
    padding: 11px
    border-radius: 25px
    color: var(--primary-color)
    background-color: #f3f4f6

.bar
    background-color: #f3f4f6
    width: 100%
    height: 6px
    margin-top: 22px

.is-current
    color: var(--primary-color)
    background-color: var(--secondary-color) !important
</style>