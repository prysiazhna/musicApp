export interface Comment {
    _id: string;
    username: string;
    text: string;
    createdAt: string;
    rating: number;
}

export interface Track {
    _id: string;
    name: string;
    artist: string;
    text: string;
    picture: string;
    audio: string;
    comments: Comment[];
    averageRating: number;
    createdAt: string;
}

export interface Playlist {
    _id: number;
    name: string;
    cover: string;
    tracks: Track[];
}