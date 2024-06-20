import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Playlist, PlaylistSchema} from "./schemas/playlist.schema";
import {PlaylistService} from "./playlist.service";
import {PlaylistController} from "./playlist.controller";
import {FileService} from "../file/file.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Playlist.name, schema: PlaylistSchema}]),
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService, FileService]
})
export class PlaylistModule {}