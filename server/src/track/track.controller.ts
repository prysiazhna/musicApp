import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {Track} from "./schemas/track.schema";


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1},
    ]))
    create(@UploadedFiles() files: any, @Body() dto: CreateTrackDto): Promise<Track> {
        const {picture, audio} = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @Get()
    getTracks(
        @Query('count') count: number,
        @Query('offset') offset: number,
        @Query('query') query: string
    ): Promise<Track[]> {
        return this.trackService.getTracks(count, offset, query);
    }

    @Get('/all')
    getAllTracks(): Promise<Track[]> {
        return this.trackService.getAllTracks();
    }

    @Get('/search')
    search(@Query('query') query: string): Promise<Track[]> {
        return this.trackService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId): Promise<Track> {
        return this.trackService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }
}