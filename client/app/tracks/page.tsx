'use client'
import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Typography, TextField, Box, Container, CircularProgress, Button} from '@mui/material';
import TrackList from "@/components/track-list/TrackList";
import {useRouter} from "next/navigation";
import {useTrackStore} from "@/store/trackStore";

const Page = () => {
    const {tracks, fetchTracks} = useTrackStore();
    const router = useRouter();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    const loadTracks = async (searchQuery: string = '') => {
        await fetchTracks(false, searchQuery);
        setLoading(false);
    };

    useEffect(() => {
        loadTracks();
    }, [fetchTracks]);

    const handleFetchMoreTracks = async () => {
        const moreTracks = await fetchTracks(true);
        if (moreTracks.length === 0) {
            setHasMore(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        loadTracks(newQuery);
    };

    return (
        <MainLayout>
            <Container className="mt-8 mb-24">
                <Box className="flex flex-row justify-between items-center" sx={{marginBottom: 7}}>
                    <Typography variant="h4" component="h1">
                        Track List
                    </Typography>
                    <Box className="flex flex-row justify-between items-center">
                        <TextField
                            size="small"
                            label="Search Tracks"
                            variant="outlined"
                            value={query}
                            className="w-80"
                            sx={{marginRight: 4}}
                            onChange={handleSearchChange}
                        />
                        <Button variant='contained' onClick={() => router.push('/tracks/create')}>Add new track</Button>
                    </Box>
                </Box>
                {loading ? (
                    <div className="flex justify-center mt-5">
                        <CircularProgress/>
                    </div>
                ) : (
                    <TrackList
                        tracks={tracks}
                        isDelete={true}
                        fetchMoreTracks={handleFetchMoreTracks}
                        hasMore={hasMore}
                        useInfiniteScroll={true}
                    />
                )}
            </Container>
        </MainLayout>
    );
};

export default Page;
