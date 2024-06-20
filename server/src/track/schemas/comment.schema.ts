import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Track} from "./track.schema";
import * as mongoose from 'mongoose'

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Track'})
    track: Track;

    @Prop({ type: mongoose.Schema.Types.Number })
    rating: number;

    _id: mongoose.Schema.Types.ObjectId;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);