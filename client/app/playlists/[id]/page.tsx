'use client'
import React, {useEffect, useState} from 'react';
import {Container, Box, CircularProgress, Typography} from '@mui/material';
import {Playlist} from '@/store/interfaces';
import {useParams} from "next/navigation";
import API_URLS from "@/api-data/apiURL";
import MainLayout from '@/layouts/MainLayout';
import TrackList from "@/components/track-list/TrackList";
import {usePlaylistStore} from "@/store/playlistStore";

const PlaylistPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {fetchPlaylistById, setCurrentPlaylist} = usePlaylistStore();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    const fetchPlaylist = async () => {
        const data = await fetchPlaylistById(id);
        if (data) {
            setPlaylist(data);
            setCurrentPlaylist(data);
        }
    };

    useEffect(() => {
        fetchPlaylist();
    }, [id, fetchPlaylistById]);


    if (!playlist) {
        return  (
            <MainLayout>
                <Box className="flex justify-center pt-7">
                    <CircularProgress/>
                </Box>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Container className="mt-8 mb-24">
                <Box className="flex items-center mb-8">
                    <img
                        src={API_URLS.BASE + playlist.cover}
                        alt={playlist.name}
                        className="w-48 h-48 object-cover mr-8 rounded-md shadow-lg"
                    />
                    <Box>
                        <Typography
                            gutterBottom
                            variant="h3"
                            component="div"
                            className="font-bold">
                            {playlist.name}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h4" component="div" className="mb-4 font-semibold">
                    Tracks
                </Typography>

                <TrackList tracks={playlist.tracks}/>

            </Container>
        </MainLayout>
    );
};

export default PlaylistPage;
