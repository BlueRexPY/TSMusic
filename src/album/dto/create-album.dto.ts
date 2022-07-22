import { ObjectId } from 'mongoose';
export class CreateAlbumDto {
    readonly name:string;
    readonly author:string;
    tracks:ObjectId[]
}