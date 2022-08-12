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
            picture: "https://storage.cloud.google.com/tsmusic-files/9d2d114e-a872-4df9-98a7-321fd5364e5c.jpg",
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