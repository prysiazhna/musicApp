import { create } from 'zustand';
import {Playlist} from "@/store/interfaces";
import {fetchPlaylistById, fetchPlaylists} from "@/api-data/api-playlists";

interface PlaylistState {
    playlists: Playlist[];
    error: string | null;
    currentPlaylist: Playlist | null;
    setCurrentPlaylist: (playlist: Playlist | null) => void;
    fetchPlaylists: () => Promise<Playlist[]>;
    fetchPlaylistById: (id: string) => Promise<Playlist>;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
    playlists: [],
    error: null,
    currentPlaylist: null,
    setCurrentPlaylist: (playlist: Playlist | null) => set((state) => ({ ...state, currentPlaylist: playlist })),
    fetchPlaylists: async () => {
        try {
            const data = await fetchPlaylists();
            set({ playlists: data, error: null });
            return data;
        } catch (error) {
            set({ error: 'Failed to fetch playlists' });
            return [];
        }
    },
    fetchPlaylistById: async (id: string) => {
        try {
            return await fetchPlaylistById(id);
        } catch (error) {
            set({ error: 'Failed to fetch playlist' });
            throw error;
        }
    },
}));
