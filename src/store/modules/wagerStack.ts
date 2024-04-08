import {defineStore} from "pinia";
import {ref} from "vue";

export const useWagerStackStore = defineStore('wagerStack', () => {
    const amount = ref(0);
    const wagers = ref([]);
    const step = ref(1);

    const setAmount = (state: number) => {
        amount.value = state
    }
    const getAmount = () => {
        return amount.value
    }
    const setWagers = (state: any) => {
        wagers.value = state
    }
    const getWagers = () => {
        return wagers.value
    }
    const setStep = (state: number) => {
        step.value = state
    }
    const getStep = () => {
        return step.value
    }

    const resetWagerStack = () => {
        amount.value = 0;
        wagers.value = [];
        step.value = 1;
    }
    return {wagers, amount, step, setAmount, getAmount, setWagers, getWagers, setStep, getStep, resetWagerStack }

}, {
    persist: {
        storage: localStorage,
    },
})
