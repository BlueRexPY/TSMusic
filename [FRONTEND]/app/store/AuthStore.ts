import { action, makeObservable, observable } from "mobx";

class AuthStore {
    AuthSettings = {
        auth: false,
        name: "",
        roles: [""]
    }
    constructor() {
        makeObservable(this, {
            AuthSettings: observable,
            Login: action,
            Logout: action
        })
    }
    Login(name: string, roles: string[]) {
        this.AuthSettings = { auth: true, name: name, roles: roles }
    };
    Logout() {
        this.AuthSettings = { auth: false, name: "", roles: [""] }
    };
}

export default new AuthStore()