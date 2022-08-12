import { makeAutoObservable } from "mobx";
import { ITrack } from "./types";

class PlayerStore {
    PlayerSettings = {
        active: false,
        track: {
            _id: "0",
            name: "Title",
            artist: "artist",
            listens: 0,
            picture: "https://storage.cloud.google.com/tsmusic-files/9d2d114e-a872-4df9-98a7-321fd5364e5c.jpg",
            audio: "https://storage.cloud.google.com/tsmusic-files/2b8f7c36-285a-4693-a1e7-deb17f177cc4.mp3"
        },
        volume: 100,
        duration: 120,
        currentTime: 0,
        pause: true
    }
    constructor() {
        makeAutoObservable(this)
    }
    setPlayerSettings(track: ITrack, active: boolean, volume: number, pause: boolean, duration: number, currentTime: number) {
        this.PlayerSettings = {
            active: active,
            track: track,
            volume: volume,
            duration: duration,
            currentTime: currentTime,
            pause: pause
        }
    }
    setPlay() {
        this.PlayerSettings = { ...this.PlayerSettings, pause: false }
    }
    setPause() {
        this.PlayerSettings = { ...this.PlayerSettings, pause: true }
    }
    setTrack(track: ITrack) {
        this.PlayerSettings = { ...this.PlayerSettings, track: track, currentTime: 0, duration: 0, active: true }
    }
    setVolume(volume: number) {
        this.PlayerSettings = { ...this.PlayerSettings, volume: volume }
    }
    setDuration(duration: number) {
        this.PlayerSettings = { ...this.PlayerSettings, duration: duration }
    }
    setCurrentTime(currentTime: number) {
        this.PlayerSettings = { ...this.PlayerSettings, currentTime: currentTime }
    }
    setActive() {
        this.PlayerSettings = { ...this.PlayerSettings, active: true, currentTime: 0 }
    }
}

export default new PlayerStore()