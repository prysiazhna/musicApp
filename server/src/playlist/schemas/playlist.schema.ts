import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose'
import {Track} from "../../track/schemas/track.schema";

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
    @Prop()
    name: string;

    @Prop()
    cover: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[];

    _id: mongoose.Schema.Types.ObjectId;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);