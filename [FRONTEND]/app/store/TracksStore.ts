
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
            picture: "https://images.genius.com/7fb8dbfbac9ee513ac03718a1d77bf42.1000x1000x1.png",
            audio: "https://mp3uk.net/mp3/files/gone-fludd-traxxxmania-mp3.mp3"
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }
    async feachTracks() {
        try {
            const response = await axios.get(DEFUALT_API+'tracks')
            this.tracksList = response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export default new TracksStore()