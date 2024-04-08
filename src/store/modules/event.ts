import {defineStore} from "pinia";
import {ref} from "vue";

export const useEventStore = defineStore('event', () => {
    const event = ref()

    const setEvent = (state: object) => {
        event.value = state
    }
    const getEvent = () => {
        return event.value
    }

    const getAllEvents = () => {
        return (event.value) ? event.value.find(c => c.id === 99).events : [];
    }

    return {event, setEvent, getEvent, getAllEvents}

}, {
    persist: {
        storage: localStorage,
    },
})
