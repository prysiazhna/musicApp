import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {PlaylistModule} from "./playlist/playlist.module";
import {join} from "path";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads/',
        }),
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.oxd8t3u.mongodb.net/music-app?retryWrites=true&w=majority&appName=Cluster0'),
    TrackModule,
    PlaylistModule,
    FileModule
  ]
})
export class AppModule {}