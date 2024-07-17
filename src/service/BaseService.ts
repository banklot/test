import dotenv from 'dotenv';
import axios, { AxiosStatic } from "axios";

class BaseService {
    protected axios: AxiosStatic;
    constructor() {
        this.axios = axios;
        this.axios.defaults.baseURL = window.location.origin+"/api";
    }
}

export default BaseService;
