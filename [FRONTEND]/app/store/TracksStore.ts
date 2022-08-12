import { makeAutoObservable } from "mobx";
import axios from 'axios';
import { DEFUALT_API } from '../utils/apiLinks';

class TracksStore {
    tracksList = [
        {
            _id: "0",
            name: "Title",
            artist: "artist",
            listens: 0,
            picture: "https://storage.cloud.google.com/tsmusic-files/9d2d114e-a872-4df9-98a7-321fd5364e5c.jpg",
            audio: "https://storage.cloud.google.com/tsmusic-files/2b8f7c36-285a-4693-a1e7-deb17f177cc4.mp3"
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }
    async fetchTracks() {
        try {
            const response = await axios.get(DEFUALT_API + 'tracks')
            this.tracksList = response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export default new TracksStore()