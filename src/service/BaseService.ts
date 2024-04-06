import dotenv from 'dotenv';
import axios, { AxiosStatic } from "axios";

class BaseService {
    protected axios: AxiosStatic;
    constructor() {
        // Get environment variables
        dotenv.config()
        this.axios = axios;
        this.axios.defaults.baseURL = (process.env.NODE_ENV !== 'development') ? process.env.VUE_APP_BACKEND_URL : "http://localhost:8081/api"
        this.axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    }
}

export default BaseService;
