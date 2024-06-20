'use client';

import React, {useState} from 'react';
import {IconButton, Box} from '@mui/material';
import {PlayArrow, Pause, VolumeUp, VolumeOff} from '@mui/icons-material';
import TrackInfo from './TrackInfo';
import {useAudio} from '@/hooks/useAudio';
import {usePlayerStore} from "@/store/playerStore";
import TrackVolumeRange from "@/components/player/TrackVolumeRange";
import TrackTimeRange from "@/components/player/TrackTimeRange";
import RepeatIcon from '@mui/icons-material/Repeat';

const Player: React.FC = () => {
    const {audioRef, handleTime, handleVolume, toggleAudio} = useAudio();
    const {pause, volume, duration, currentTime, setVolume} = usePlayerStore();
    const {active} = usePlayerStore();
    const [isLoop, setIsLoop] = useState<boolean>(false);

    const toggleLoop = () => {
        setIsLoop(!isLoop);
    };

    if (!active) {
        return null;
    }
    return (
        <Box>
            <div
                className="h-16 w-full fixed bottom-0 flex items-center px-3 bg-cyan-800 z-[1200] shadow-custom text-white">
                <IconButton onClick={toggleAudio}>
                    {pause ? (
                        <PlayArrow className="h-12 w-12 text-white" aria-hidden="true"/>
                    ) : (
                        <Pause className="h-12 w-12 text-white" aria-hidden="true"/>
                    )}
                </IconButton>

                <TrackInfo/>

                <TrackTimeRange maxValue={duration} currentValue={currentTime} onChange={handleTime}/>

                <IconButton
                    color={isLoop ? "secondary" : "success"}
                    onClick={toggleLoop}>
                    <RepeatIcon/>
                </IconButton>

                <div className="ml-auto mr-1">
                    <TrackVolumeRange maxValue={100} currentValue={volume} onChange={handleVolume}/>
                </div>

                <audio
                    ref={audioRef}
                    loop={isLoop}
                    onTimeUpdate={() => usePlayerStore.setState({currentTime: audioRef.current?.currentTime || 0})}
                    onLoadedMetadata={() => usePlayerStore.setState({duration: audioRef.current?.duration || 0})}
                />
            </div>
        </Box>
    );
};

export default Player;
