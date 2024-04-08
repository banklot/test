import Session from "@/utils/session";

declare class App {
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
}

export default App;