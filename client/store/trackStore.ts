import {create} from 'zustand';
import {Track} from './interfaces';
import {fetchMoreTracks, fetchTrackById} from "@/api-data/api-tracks";

interface TrackState {
    tracks: Track[];
    error: string | null;
    fetchTracks: (isMore?: boolean, query?: string) => Promise<Track[]>;
    setTracks: (tracks: Track[]) => void;
    fetchTrackById: (id: string) => Promise<Track>;
}

export const useTrackStore = create<TrackState>((set, get) => ({
    tracks: [],
    error: null,
    fetchTracks: async (isMore = false, query = '') => {
        try {
            const { tracks } = get();
            const offset = isMore ? tracks.length : 0;
            const data = await fetchMoreTracks(offset, query);
            const fetchedTracks = isMore ? [...tracks, ...data] : data;

            set({
                tracks: fetchedTracks,
                error: null,
            });
            return fetchedTracks;
        } catch (error) {
            set({ error: 'Failed to fetch tracks' });
            return [];
        }
    },
    fetchTrackById: async (id: string) => {
        try {
            return await fetchTrackById(id);
        } catch (error) {
            set({ error: 'Failed to fetch track' });
            throw error;
        }
    },
    setTracks: (tracks: Track[]) => set({tracks})
}));
