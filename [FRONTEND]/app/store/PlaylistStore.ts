import { makeAutoObservable } from "mobx";
import axios from 'axios';
import { DEFUALT_API } from '../utils/apiLinks';

class PlaylistStore {
    playlistList = [
        {
            _id: "0",
            name: "Title",
            author: "Admin",
            listens: 0,
            picture: "https://images.genius.com/7fb8dbfbac9ee513ac03718a1d77bf42.1000x1000x1.png",
            tracks:[
                "someId"
            ]
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }
    async fetchPlaylist() {
        try {
            const response = await axios.get(DEFUALT_API + 'albums')
            this.playlistList = response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export default new PlaylistStore()