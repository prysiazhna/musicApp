import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId, Types} from "mongoose";
import {Playlist, PlaylistDocument} from "./schemas/playlist.schema";
import {FileService, FileType} from "../file/file.service";
import {CreatePlaylistDto} from "./dto/create-playlist.dto";

@Injectable()
export class PlaylistService {

    constructor(@InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>, private fileService: FileService) {
    }

    async create(dto: CreatePlaylistDto, cover: Express.Multer.File): Promise<Playlist> {
        let picturePath: string = '';
        if (cover) {
            picturePath = this.fileService.createFile(FileType.IMAGE, cover);
        }
        const tracks = Array.isArray(dto.tracks) ? dto.tracks : [dto.tracks];
        const trackIds = tracks.map(track => new Types.ObjectId(track.toString()));

        const playlist = new this.playlistModel({
            ...dto,
            tracks: trackIds,
            cover: picturePath
        });

        await playlist.save();

        return this.playlistModel.findById(playlist._id).populate('tracks').exec();
    }

    async getAll(count = 10, offset = 0): Promise<Playlist[]> {
        return this.playlistModel.find().skip(Number(offset)).limit(Number(count));
    }

    async getOne(id: ObjectId): Promise<Playlist> {
        return this.playlistModel.findById(id).populate('tracks');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const playlist: PlaylistDocument = await this.playlistModel.findByIdAndDelete(id);
        if (!playlist) {
            throw new NotFoundException('Track not found');
        }
        this.fileService.removeFile(playlist.cover);
        return playlist._id;
    }
}