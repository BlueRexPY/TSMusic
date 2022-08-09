export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    listens: number;
    picture: string;
    audio: string;
}

export interface IAlbume {
    _id: string;
    name: string;
    author: string;
    listens: number;
    picture: string;
    tracks:string[];
}
