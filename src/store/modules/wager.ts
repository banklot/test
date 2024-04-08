import {defineStore} from "pinia";
import {ref} from "vue";


export const useWagerStore = defineStore('wager', () => {
    const wager = ref([]);
    const totalWager = ref(0);
    const selectedEvents = ref();
    const rejectedWagers = ref();

    const setWager = (state: any) => {
        wager.value = state
    }

    const getWager = () => {
        return wager.value
    }

    const setTotalWager = (state: number) => {
        totalWager.value = state
    }

    const getTotalWager = () => {
        return totalWager.value
    }

    const setSelectedEvents = (state: object) => {
        selectedEvents.value = state
    }

    const getSelectedEvents = () => {
        return selectedEvents.value
    }

    const resetWager = () => {
        wager.value = [];
    }

    const resetTotalWager = () => {
        totalWager.value = 0
    }

    const getRejectedWagers = () => {
        return rejectedWagers.value;
    }
    const setRejectedWagers = (state: object) => {
        rejectedWagers.value = state
    }

    return {
        wager, setWager, getWager,resetWager,
        totalWager, setTotalWager, getTotalWager,resetTotalWager,
        selectedEvents, setSelectedEvents, getSelectedEvents,
        rejectedWagers, getRejectedWagers, setRejectedWagers
    }

}, {
    persist: {
        storage: localStorage,
    },
})
