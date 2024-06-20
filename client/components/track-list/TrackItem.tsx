import React from 'react';
import {Grid, Card, IconButton} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import {useRouter} from 'next/navigation';
import {Track} from "@/store/interfaces";
import {usePlayerStore} from "@/store/playerStore";
import API_URLS from "@/api-data/apiURL";
import {useTrackStore} from "@/store/trackStore";
import {deleteTrack} from "@/api-data/api-tracks";


interface TrackItemProps {
    track: Track;
    isDelete?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, isDelete}) => {
    const router = useRouter();
    const {pause, duration, active, setPause, setActive} = usePlayerStore();
    const isCurrentTrack = active && active._id === track._id;
    const {tracks, setTracks} = useTrackStore();
    const handlePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCurrentTrack) {
            if (pause) {
                setPause(false);
            } else {
                setPause(true);
            }
        } else {
            setActive(track);
            setPause(false);
        }
    };

    const handleDeleteTrack = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteTrack(track._id);
        setTracks(tracks.filter(trackItem => track._id !== trackItem._id));
    }

    return (
        <Card className="m-5 px-5 py-3 flex items-center" onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={handlePlayPause} className="mx-5">
                {!isCurrentTrack || pause ? <PlayArrow/> : <Pause/>}
            </IconButton>

            <img alt="img" src={API_URLS.BASE + track.picture} className="bg-cover h-16 w-24 ml-3"/>

            <Grid container direction="column" className="w-52 mx-5">
                <div>{track.name}</div>
                <div className=" text-sm text-gray-600">{track.artist}</div>
            </Grid>
            { isDelete ?
                (<IconButton onClick={(e) => e.stopPropagation()} className="ml-auto">
                     <Delete onClick={(e) => {handleDeleteTrack(e)}}/>
                 </IconButton>)
                : <></>
             }
        </Card>
    );
};

export default TrackItem;
