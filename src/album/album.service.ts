import { Injectable, UseInterceptors } from '@nestjs/common';
import { Album, AlbumDocument } from './schemas/album.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService
    ) { }

    async create(dto:CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE,picture)
        const albume = await this.albumModel.create({...dto,listens: 0, picture:picturePath})
        return albume
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albumes = await this.albumModel.find().skip(Number(offset)).limit(Number(count));
        return albumes;
    }

    async getOneById(id:ObjectId): Promise<Album> {
        const albume = await this.albumModel.findById(id)
        return albume
    }

    async getOneByName(albumeName:string): Promise<ObjectId[]> {
        const albume = await this.albumModel.findOne({name:albumeName})
        return albume.tracks
    }

    async getTop(count = 5): Promise<Album[]> {
        const albume = await this.albumModel.find().sort({listens: -1}).limit(count)
        return albume
    }

    async delete(id:ObjectId): Promise<ObjectId> {
        const albume = await this.albumModel.findByIdAndDelete(id)
        return albume._id
    }

    async listen(id: ObjectId) {
        const albume = await this.albumModel.findById(id);
        albume.listens += 1
        albume.save()
    }
}
