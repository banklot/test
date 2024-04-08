<template>
    <div class="field">
        <label for="type">{{ label }}</label>

        <Dropdown
                :label="label"
                v-model="value"
                :options="options"
                optionLabel="name"
                optionValue="value"
                placeholder="Please select an option"
        />

        <small id="email-help" class="p-error">{{ errorMessage }}</small>
    </div>
</template>

<script lang="ts" setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import Dropdown from 'primevue/dropdown';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
});

const { errorMessage, value } = useField(toRef(props, 'name'));
</script>
