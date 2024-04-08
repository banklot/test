import {defineStore} from "pinia";
import {Ref, ref, UnwrapRef} from "vue";
import {useCookies} from "vue3-cookies";


export const useUserStore = defineStore('user', () => {
    const user: Ref<UnwrapRef<object>> = ref({})

    const setUser = (state: object) => {
        if (!state) {
            state = {};
        }
        user.value = state;
    }

    const getUser = () => {
        // return useCookies().cookies.get('_Host-user');
        return user.value;
    }

    const removeUser = () => {
        // return useCookies().cookies.remove('_Host-user');
        user.value = {};
    }

    return {user, setUser, getUser, removeUser}

}, {
    persist: {
        storage: localStorage
    }
});
