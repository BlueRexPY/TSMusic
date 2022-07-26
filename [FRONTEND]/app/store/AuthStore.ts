import { action, makeObservable, observable } from "mobx";

class AuthStore {
    AuthSettings = {
        auth: false,
        name:"",
    }
    constructor(){
        makeObservable(this,{
            AuthSettings: observable,
            Login: action,
            Logout: action
        })
    }
    Login(name:string) {
        this.AuthSettings = { auth:true, name:name }
    };
    Logout(){
       
        this.AuthSettings = { auth:false, name:"" }
    };
}

export default new AuthStore()