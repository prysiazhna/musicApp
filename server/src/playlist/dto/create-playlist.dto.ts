import {ObjectId} from "mongoose";

export class CreatePlaylistDto {
    readonly name: string;
    readonly tracks : ObjectId[];
}