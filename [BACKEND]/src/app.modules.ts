import { UserModule } from './user/user.module';
import { Module } from "@nestjs/common";
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

@Module({
    imports: [
        MongooseModule.forRoot("MONGO"),
        UserModule,
        AlbumModule,
        TrackModule,
        FileModule,
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),}),
    ]
})

export class AppModule {}
