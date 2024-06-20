import React from 'react';
import { Grid } from '@mui/material';
import { usePlayerStore } from "@/store/playerStore";

const TrackInfo: React.FC = () => {
    const { active } = usePlayerStore();

    if (!active) {
        return null;
    }

    return (
        <div className="min-w-52 max-w-72 mx-5">
            <div>{active.name}</div>
            <div className="text-sm">{active.artist}</div>
        </div>
    );
};

export default TrackInfo;
