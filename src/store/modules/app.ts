import {defineStore} from "pinia";
import {ref} from "vue";

export const useAppStore = defineStore('app', () => {
    const app = ref();
    const from = ref();

    const setApp = (state: object) => {
        app.value = state
    }

    const getApp = () => {
        return app.value
    }

    const setFrom = (state: string) => {
        from.value = state
    }

    const getFrom = () => {
        return from.value
    }

    return {
        app, setApp, getApp,
        from, setFrom, getFrom
    }

}, {
    persist: {
        storage: localStorage,
    },
})
