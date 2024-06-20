import { create } from 'zustand';
import { Track } from './interfaces';

interface PlayerState {
    active: Track | null;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    setPause: (pause: boolean) => void;
    setActive: (track: Track | null) => void;
    setVolume: (volume: number) => void;
    setDuration: (duration: number) => void;
    setCurrentTime: (time: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
    active: null,
    volume: 0.5,
    duration: 0,
    currentTime: 0,
    pause: true,
    setPause: (pause) => set({ pause }),
    setActive: (track) => set({ active: track, duration: 0, currentTime: 0 }),
    setVolume: (volume) => set({ volume }),
    setDuration: (duration) => set({ duration }),
    setCurrentTime: (time) => set({ currentTime: time })
}));
