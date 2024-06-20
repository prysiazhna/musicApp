import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {Model, ObjectId} from "mongoose";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";


@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private fileService: FileService) {
    }

    async create(dto: CreateTrackDto, picture: Express.Multer.File, audio: Express.Multer.File): Promise<Track> {
        const audioPath: string = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath: string = this.fileService.createFile(FileType.IMAGE, picture);
        return await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath, averageRating: 0});
    }

    async getTracks(count = 10, offset = 0, query: string = ''): Promise<Track[]> {
        const sortCriteria = {createdAt: 'desc' as const};
        if (query) {
            return this.trackModel.find({
                name: {$regex: new RegExp(query, 'i')}
            })
                .sort(sortCriteria)
                .skip(Number(offset))
                .limit(Number(count));
        } else {
            return this.trackModel.find()
                .sort(sortCriteria)
                .skip(Number(offset))
                .limit(Number(count));
        }
    }

    async getAllTracks(): Promise<Track[]> {
        const sortCriteria = {createdAt: 'desc' as const};
        return this.trackModel.find().sort(sortCriteria);
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments').exec();

        if (!track) {
            throw new Error('Track not found');
        }
        const ratings = track.comments.map((comment) => comment['rating']);
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);

        track.averageRating = ratings.length > 0 ? sum / ratings.length : 0;

        return track;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track: TrackDocument = await this.trackModel.findByIdAndDelete(id);
        if (!track) {
            throw new NotFoundException('Track not found');
        }
        this.fileService.removeFile(track.audio);
        this.fileService.removeFile(track.picture);
        return track._id;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const comment: CommentDocument = await this.commentModel.create({...dto})
        await this.trackModel.findByIdAndUpdate(dto.trackId, {
            $push: {comments: comment._id}
        });
        return comment;
    }

    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        });
    }
}