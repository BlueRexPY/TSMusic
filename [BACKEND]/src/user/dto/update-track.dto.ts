import { ObjectId } from 'mongoose';
export class UpdateTrackDto {
    userId:ObjectId;
    trackId:ObjectId;
}