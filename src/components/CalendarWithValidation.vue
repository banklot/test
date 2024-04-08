<template>
    <div class="field">
        <label :for="name" class="block text-900 text-l font-medium">{{ label }}</label>
        <Calendar
            v-model="value"
            :aria-describedby="`${name}-help`"
            class="inputBox"
            :class="{ 'p-invalid': errorMessage }"
            showIcon
        />
        <small :id="`${name}-help`" class="block text-red-600 dark:text-red-500 font-bold errorMessage">{{ errorMessage }}</small>
    </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import InputText from 'primevue/inputtext';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

const { errorMessage, value } = useField(toRef(props, 'name'));
</script>

<style scoped lang="sass">
.inputBox
    height: 46px
    width: 100%

.is-invalid
    background-color: #fee7e5
    border-color: indianred

.errorMessage
    font-weight: bold
    font-size: small
    padding-left: 1px
    margin-top: 5px
    margin-bottom: 5px





</style>
