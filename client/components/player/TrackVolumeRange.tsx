import React, {useRef, useState} from 'react';
import {VolumeOff, VolumeUp} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {usePlayerStore} from "@/store/playerStore";

interface TrackVolumeRangeProps {
    currentValue: number;
    maxValue: number;
    onChange: (e: any) => void;
}

const TrackVolumeRange: React.FC<TrackVolumeRangeProps> =
    ({
         maxValue, currentValue, onChange
     }) => {
        const rangeInputRef = useRef<HTMLInputElement>(null);
        const [isMuted, setIsMuted] = useState<boolean>(false);
        const { volume} = usePlayerStore();
        const [previousVolume, setPreviousVolume] = useState<number>(volume);

        const toggleMute = () => {
            if (isMuted) {
                setVolumeOnMute(false, previousVolume)
            } else {
                setPreviousVolume(volume *100);
                setVolumeOnMute(true, 0)
            }
        };

        const setVolumeOnMute=(muteValue:boolean, volumeRate:number)=>{
            setIsMuted(muteValue);
            if (rangeInputRef.current) {
                rangeInputRef.current.value = volumeRate.toString();
                onChange({ target: { value: volumeRate } });
            }
        }

        return (
            <div className="wrapper">
                <div className="range flex">
                    <IconButton onClick={toggleMute} color="success">
                        {isMuted ? <VolumeOff/> : <VolumeUp/>}
                    </IconButton>
                    <div className="w-14 text-center">{Math.ceil(currentValue * 100)}</div>
                    <input
                        type="range"
                        className="mr-4 w-40"
                        min={0}
                        max={maxValue}
                        ref={rangeInputRef}
                        onChange={onChange}/>
                    <div className="w-14 text-left">{maxValue}</div>
                </div>
            </div>

        );
    };

export default TrackVolumeRange;