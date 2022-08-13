import { makeAutoObservable } from "mobx";


class NavStore {
    navState = {PATH:"MAIN"}

    constructor() {
        makeAutoObservable(this)
    }
    
    setPath(path:string){this.navState.PATH = path}
}

export default new NavStore()