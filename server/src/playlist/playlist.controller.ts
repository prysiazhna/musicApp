import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {PlaylistService} from "./playlist.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ObjectId} from "mongoose";
import {Playlist} from "./schemas/playlist.schema";
import {CreatePlaylistDto} from "./dto/create-playlist.dto";

@Controller('/playlists')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{name: 'cover', maxCount: 1}]))
    async create(@UploadedFiles() files: { cover?: Express.Multer.File[] }, @Body() dto: CreatePlaylistDto): Promise<Playlist> {
        return this.playlistService.create(dto, files?.cover[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number): Promise<Playlist[]> {
        return this.playlistService.getAll(count, offset)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId): Promise<Playlist> {
        return this.playlistService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.playlistService.delete(id);
    }
}