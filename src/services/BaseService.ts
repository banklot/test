import axios, {AxiosStatic, AxiosResponse} from "axios";
import App from "@/utils/app.d";
import app from "@/utils/app";
import {useUserStore} from "@/store/modules/user";
import {logout} from "@/utils/general";

class BaseService {
    protected apiLoginURL: string = "/auth/login"
    protected apiLogoutURL: string = "/auth/logout"


    protected axios: AxiosStatic;

    protected baseURL: string;
    protected app: App;
    protected user: object

    constructor() {
        // Get environment variables
        this.axios = axios;
        this.app = app;
        this.baseURL = app.api;

        this.axios.defaults.baseURL = this.baseURL;

        this.axios.interceptors.request.use(this.handleRequest.bind(this))
        this.axios.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
        this.user = useUserStore().getUser();
    }

    handleRequest (req) {
        try {
            // We only need the auth headers when not logging in
            if (req.url !== this.apiLoginURL) {
                this.axios.defaults.headers.common = {
                    ...this.axios.defaults.headers.common,
                    ...this.getAuthHeader()
                }
            }
        } catch (err) {
            // TODO: Session is unavailable but we are still making API calls
            throw err;
        }
        return req;
    }

    getAuthHeader () {
        if (this.user?.length === 0) {
            // logout();
            return {};
        }
        if (this.app.session.get() == null) {
            return {};
        }
        return  {
            'Authorization': `Bearer ${this.app.session.get()}`
        }
    }

    handleResponse (response: AxiosResponse<any, any>) {
        return response;
    }
    handleError(error: any) {
        switch (error.code) {
            case axios.AxiosError.ERR_NETWORK:
                console.error("network error occurred");
                break;
            case axios.AxiosError.ERR_BAD_REQUEST:
                if (!error.response) {
                    console.error("no response in error");
                    break;
                }
                switch (error.response.status) {
                    case 401:
                        this.app.session.logout();
                        break;
                    case 403:
                        console.error("use has no access");
                        break;
                }
                break;
            case axios.AxiosError.ERR_BAD_RESPONSE:
                if (!error.response) {
                    console.error("no response in error");
                    break;
                }
                switch (error.response.status) {
                    case 502:
                        console.error("backend services not responding", error);
                        // TODO: Maintenance page
                        break;
                }
                break;
            default:
                console.error(`uncaught error code: "${error.code}"`, error);
                break;
        }
        throw error;
    }
}

export default BaseService;
