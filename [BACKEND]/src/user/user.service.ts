import { UpdateTrackDto } from './dto/update-track.dto';
import { Injectable } from '@nestjs/common';
import { User,UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(dto:CreateUserDto): Promise<User> {
        const user = await this.userModel.create({...dto,tracks:[]})
        return user
    }

    async getAll(count = 10, offset = 0): Promise<User[]> {
        const user = await this.userModel.find().skip(Number(offset)).limit(Number(count));
        return user
    }

    async getOneByName(userName:string): Promise<ObjectId[]> {
        const user = await this.userModel.findOne({name:userName})
        return user.tracks
    }

    async delete(id:ObjectId): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id)
        return user._id
    }

    async updateTrack(dto:UpdateTrackDto): Promise<ObjectId[]> {
        let user = await this.userModel.findById(dto.userId)
        if (user.tracks.includes(dto.trackId)){
            user = await this.userModel.findByIdAndUpdate(dto.userId,{"tracks": user.tracks.filter( i => i !== dto.trackId )})
        }else{
            user = await this.userModel.findByIdAndUpdate(dto.userId,{"tracks": [...user.tracks, dto.trackId]})
        }
        return user.tracks
    }

    async login(dto:CreateUserDto): Promise<User[]> {
        const user = await this.userModel.find({$and:[{name:dto.name},{password:dto.password}]})
        return user
    }
}
