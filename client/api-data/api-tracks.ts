import axios from 'axios';
import {Track } from '@/store/interfaces';
import API_URLS from "@/api-data/apiURL";


export const fetchAllTracks = async (): Promise<Track[]> => {
    const response = await axios.get(API_URLS.ALL_TRACKS);
    return response.data;
};

export const fetchMoreTracks = async (offset: number, query: string = ''): Promise<Track[]> => {
    const queryParam = query ? `&query=${encodeURIComponent(query)}` : '';
    const response = await axios.get(`${API_URLS.TRACKS}?offset=${offset}${queryParam}`);
    return response.data;
};

export const fetchTrackById = async (id: string): Promise<Track> => {
    const response = await axios.get(`${API_URLS.BASE}tracks/${id}`);
    return response.data;
};

export const deleteTrack = async (trackId: string): Promise<Track> => {
    const response =  await axios.delete(`${API_URLS.TRACKS}/${trackId}`);
    return response.data;
};
