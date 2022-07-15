import { Module } from "@nestjs/common";
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

@Module({
    imports: [
        TrackModule,MongooseModule.forRoot(""),
        TrackModule,
        FileModule,
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),}),
    ]
})

export class AppModule {}
