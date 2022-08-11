import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
const { Storage } = require("@google-cloud/storage");

export enum FileType {
    AUDIO = 'audio',
    IMAGE = "image"
}

@Injectable()
export class FileService{

    createFile(type: FileType, file): string {
         try {
            //return `https://storage.googleapis.com/tsmusic-files/9ed606cc-714e-484a-9bc7-9ffe8cb85eb5.jpg`
            const gc = new Storage({ keyFilename: "google-cloud-key.json" });
            gc.getBuckets().then(x => console.log(x))
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '..', 'static', type)
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            
            gc.bucket("tsmusic-files").upload(filePath+"/"+fileName, {
                destination: fileName,
              });

            return `https://storage.cloud.google.com/tsmusic-files/${fileName}`

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}