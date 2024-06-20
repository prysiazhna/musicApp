import React from 'react';
import {formatTime} from "@/utils/timeFormat";

interface TrackTimeRangeProps {
    currentValue: number;
    maxValue: number;
    onChange: (e: any) => void;
}

const TrackTimeRange: React.FC<TrackTimeRangeProps> =
    ({
         maxValue, currentValue, onChange
     }) => {
        return (
            <div className="wrapper">
                <div className="range flex">
                    <div className="w-14 text-center">{formatTime(currentValue)}</div>
                    <input
                        type="range"
                        min={0}
                        className="mx-4 w-96  outline-none  transition-opacity duration-150"
                        max={maxValue}
                        value={currentValue}
                        onChange={onChange}/>
                    <div className="w-14 text-left">{formatTime(maxValue)}</div>
                </div>
            </div>
        );
    };

export default TrackTimeRange;