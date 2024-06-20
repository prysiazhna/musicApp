import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose'

export type TrackDocument = Track & Document;

@Schema({ timestamps: true })
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({ default: 0 })
    averageRating: number;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];

    _id: mongoose.Schema.Types.ObjectId;

}

export const TrackSchema = SchemaFactory.createForClass(Track);