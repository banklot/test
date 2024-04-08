import {useCookies} from "vue3-cookies";
import {VueCookies} from "vue3-cookies/dist/interfaces";
import router from "@/router";
import AuthService from "@/services/AuthService";

class Cookie {
    name: string
    cookies: VueCookies

    constructor(name: string) {
        this.name = name;
        this.cookies = useCookies().cookies;
    }

    clear = () => {
        this.cookies.remove(this.name);
        sessionStorage.clear();
    }

    save = (value: string) => {
        this.cookies.set(this.name, value);
    }

    get = (): string => {
        return this.cookies.get(this.name);
    }
}

class Session {
    private loginURL: string = "/login"
    auth: AuthService
    session: Cookie
    email: Cookie
    info: Cookie
    token: string
    loggingOut: boolean

    constructor(session: string, email: string, info: string) {
        this.session = new Cookie(session);
        this.email = new Cookie(email);
        this.info = new Cookie(info);
        // This covers a race condition of Auth requiring app,
        // app requiring session, session requiring auth
        // this should all be in the same place
        try {
            this.auth = this.getAuth();
        }
        catch (err) {
            if (err instanceof ReferenceError) {
                // ignore
                return;
            }
            console.error("something wrong happened", err);
        }
    }

    setToken = (token: string) => {
        this.token = token;
    }

    getAuth = (): AuthService => {
        if (this.auth != undefined) {
            return this.auth;
        }
        return this.auth = new AuthService();
    }

    get = (): string => {
        // TODO: This is for debugging only
        // const value = this.session.get();
        // console.trace(this.session.name, value);
        return this.session.get();
    }

    getEmail = (): string => {
        // TODO: This is for debugging only
        // const value = this.email.get();
        // console.trace(this.email.name, value);
        return this.email.get();
    }

    getSSOInfo = (): string => {
        // TODO: This is for debugging only
        // const value = this.info.get();
        // console.trace(this.info.name, value);
        return this.info.get();
    }

    dashboard = () => {
        router.push({name: 'dashboard'}).catch((err) => {
            console.error("unable to push to dashboard", err);
        });
    }

    login = () => {
        // window.location.hash = "#/login"
        router.push(this.loginURL).catch((err) => {
            console.error("unable to push to login", err);
        });
    }

    logout = () => {
        if (this.loggingOut) {
            this.login();
            return;
        }
        this.setLogout();

        this.getAuth().logout()
            .then(this.session.clear.bind(this.session))
            .then(this.login.bind(this))
            .then(this.clearLogout.bind(this));

    }

    setLogout = () => {
        this.loggingOut = true;
    }

    clearLogout = () => {
        this.loggingOut = false;
    }

    save = (value: string) => {
        this.session.save(value);
    }

    saveEmail = (email: string) => {
        this.email.save(email);
    }
}

export default Session;
