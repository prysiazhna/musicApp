import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {PlaylistModule} from "./playlist/playlist.module";
import {join} from "path";
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads/',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_DB_URI'),
            }),
            inject: [ConfigService],
        }),
        TrackModule,
        PlaylistModule,
        FileModule
    ]
})
export class AppModule {}