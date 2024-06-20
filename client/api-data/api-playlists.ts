import axios from 'axios';
import {Playlist} from '@/store/interfaces';
import API_URLS from "@/api-data/apiURL";

export const fetchPlaylists = async (): Promise<Playlist[]> => {
    const response = await axios.get(API_URLS.PLAYLISTS);
    return response.data;
};

export const fetchPlaylistById = async (id: string): Promise<Playlist> => {
    const response = await axios.get(`${API_URLS.BASE}playlists/${id}`);
    return response.data;
};

export const deletePlaylist = async (playlistsId: number): Promise<Playlist> => {
    const response = await axios.delete(`${API_URLS.PLAYLISTS}/${playlistsId}`);
    return response.data;
};

export const getPlaylistIds = async () => {
    const response = await axios.get(API_URLS.PLAYLISTS); // Змініть на відповідний URL для отримання плейлистів
    const playlists: Playlist[] = response.data;
    return playlists.map(playlist => ({id: playlist._id}));
};