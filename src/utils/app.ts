import Session from "@/utils/session";

class App {
    name: string
    version: string
    base: string
    login: string
    api: string
    authGoogle: string
    authFacebook: string
    sessionCookie: string
    ssoCookie: string
    emailCookie: string
    session: Session

    constructor() {
        // App
        this.name = import.meta.env.VITE_APP_NAME;
        this.version = import.meta.env.VITE_APP_VERSION;

        // Cookies
        this.sessionCookie = import.meta.env.VITE_SESSION_COOKIE || "__Host-csrf-token";
        this.ssoCookie = import.meta.env.VITE_SSO_COOKIE || "__Host-sso-info";
        this.emailCookie = import.meta.env.VITE_SSO_COOKIE || "__Host-email";

        // Session
        this.session = new Session(this.sessionCookie, this.emailCookie, this.ssoCookie)

        // Network & Routes
        this.base = import.meta.env.VITE_BASE_URL;
        this.login = `${this.base}/#/login`;
        this.api = `${this.base}/api`;
        this.authGoogle = `${this.api}/auth/google`;
        this.authFacebook = `${this.api}/auth/facebook`;
    }
}

const conf: App = new App()



export default conf;