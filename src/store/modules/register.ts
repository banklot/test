import {defineStore} from "pinia";
import {ref} from "vue";

export const useRegisterStore = defineStore('register', () => {
    // Step
    const step = ref()
    const email = ref()
    const password = ref()
    const firstname = ref()
    const surname = ref()
    const dob = ref()
    const address = ref()
    const state = ref()
    const municipality = ref()
    const city = ref()
    const phone = ref()
    const areaCode = ref()
    const document = ref()
    const nationality = ref()
    const bank = ref()

    const reset = () => {
        setRegisterStep(1);
        setEmail(null);
        setCity(null);
        setBank(null);
        setState(null);
        setNationality(null);
        setDocument(null);
        setPhone(null);
        setAreaCode(null);
        setAddress(null);
        setFirstname(null);
        setSurname(null);
        setDob(null);
        setPassword(null);
    }

    const setRegisterStep = (state: number) => {
        step.value = state
    }
    const getRegisterStep = () => {
        return step.value
    }
    // New User
    const setEmail = (state: object) => {
        email.value = state
    }
    const getEmail = () => {
        return email.value
    }
    // Password
    const setPassword = (state: object) => {
        password.value = state
    }
    const getPassword = () => {
        return password.value
    }
    // Firstname
    const setFirstname = (state: object) => {
        firstname.value = state
    }
    const getFirstname = () => {
        return firstname.value
    }
    // Surname
    const setSurname = (state: object) => {
        surname.value = state
    }
    const getSurname = () => {
        return surname.value
    }
    // Date of birth
    const setDob = (state: object) => {
        dob.value = state
    }
    const getDob = () => {
        return dob.value
    }
    // Address
    const setAddress = (state: object) => {
        address.value = state
    }
    const getAddress = () => {
        return address.value
    }
    // State
    const setState = (statex: object) => {
        state.value = statex
    }
    const getState = () => {
        return state.value
    }
    // Municipality
    const setMunicipality = (statex: object) => {
        municipality.value = statex
    }
    const getMunicipality = () => {
        return municipality.value
    }
    // City
    const setCity = (state: object) => {
        city.value = state
    }
    const getCity = () => {
        return city.value
    }
    // Phone
    const setPhone = (state: object) => {
        phone.value = state
    }
    const getPhone = () => {
        return phone.value
    }
    // Phone
    const setAreaCode = (state: string) => {
        areaCode.value = state
    }
    const getAreaCode = () => {
        return areaCode.value
    }
    // Document
    const setDocument = (state: string) => {
        document.value = state
    }
    const getDocument = () => {
        return document.value
    }
    // Nationality
    const setNationality = (state: string) => {
        nationality.value = state
    }
    const getNationality = () => {
        return nationality.value
    }
    // Bank
    const setBank = (state: string) => {
        bank.value = state
    }
    const getBank = () => {
        return bank.value
    }
    //
    return {
        reset,
        step, setRegisterStep, getRegisterStep,
        email, setEmail, getEmail,
        password, setPassword, getPassword,
        firstname, setFirstname, getFirstname,
        surname, setSurname, getSurname,
        dob, setDob, getDob,
        address, setAddress, getAddress,
        state, setState, getState,
        municipality, setMunicipality, getMunicipality,
        city, setCity, getCity,
        phone, setPhone, getPhone,
        areaCode, setAreaCode, getAreaCode,
        document, setDocument, getDocument,
        nationality, setNationality, getNationality,
        bank, setBank, getBank,
    }

},
    {
        persist: {
            storage: sessionStorage,
        },
    })
