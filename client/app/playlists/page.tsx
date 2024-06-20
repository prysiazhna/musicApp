'use client'
import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import PlayList from "@/components/playlist/PlayList";
import {Box, Button, CircularProgress, Container, Typography} from '@mui/material';
import {usePlaylistStore} from "@/store/playlistStore";
import {useRouter} from "next/navigation";

const Page = () => {
    const {playlists, fetchPlaylists} = usePlaylistStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const loadPlaylists = async () => {
        await fetchPlaylists();
        setLoading(false);
    };

    useEffect(() => {
        loadPlaylists();
    }, [fetchPlaylists]);


    return (
        <>
            <MainLayout>
                <Container className="mt-8">
                    <Box className="flex flex-row justify-between items-center">
                        <Typography variant="h4" component="h1" sx={{marginBottom: 7}}>
                            Playlists
                        </Typography>
                        <Button variant='contained' onClick={() => router.push('/playlists/create')}>
                            Add playlist
                        </Button>
                    </Box>
                    {loading ? (
                        <div className="flex justify-center mt-5">
                            <CircularProgress/>
                        </div>
                    ) : (<PlayList playlists={playlists}/>)
                    }
                </Container>
            </MainLayout>
        </>
    );
};

export default Page;
