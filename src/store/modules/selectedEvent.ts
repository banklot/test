import {defineStore} from "pinia";
import {ref} from "vue";

export const useSelectedEventStore = defineStore('selectedEvents', () => {
    const dayEvents = ref();
    const afternoonEvents = ref();
    const eveningEvents = ref();
    const allEvents = ref();

    const setSelectedEvents = (events: object, timeRange: string) => {
        switch (timeRange) {
            case "morning":
                dayEvents.value = events;
                break;
            case "afternoon":
                afternoonEvents.value = events;
                break;
            case "evening":
                eveningEvents.value = events;
                break;
        }
        allEvents.value = dayEvents.value.concat(afternoonEvents.value).concat(eveningEvents.value);
    }
    const getAllSelectedEvents = () => {
        return allEvents.value;
    }

    const resetAllSelectedEvents = () => {
        dayEvents.value = [];
        afternoonEvents.value = [];
        eveningEvents.value = [];
        allEvents.value = [];
    }

    return {
        dayEvents, afternoonEvents, eveningEvents, allEvents,
        setSelectedEvents, getAllSelectedEvents, resetAllSelectedEvents,
    }

}, {
    persist: {
        storage: localStorage,
    },
})
