'use client'
import React, {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import {Box, Button, CircularProgress, Dialog, Divider, Grid} from '@mui/material';
import MainLayout from "@/layouts/MainLayout";
import {Track} from "@/store/interfaces";
import API_URLS from "@/api-data/apiURL";
import AddCommentModal from "@/components/modals/AddCommentModal";
import {sortByDate} from "@/utils/sortByDate";
import CommentCard from "@/components/CommentCard";
import {useTrackStore} from "@/store/trackStore";
import StarsRating from 'react-star-rate';
import NoData from "@/components/NoData";
import AddCommentIcon from '@mui/icons-material/AddComment';

const TrackPage = () => {
    const {fetchTrackById} = useTrackStore();
    const [track, setTrack] = useState<Track>();
    const params = useParams();
    const id = params.id as string;
    const [open, setOpen] = useState(false);

    const fetchTrack = async () => {
        const data = await fetchTrackById(id);
        if (data) {
            setTrack(data);
        }
    };

    useEffect(() => {
        fetchTrack();
    }, [id, fetchTrackById]);


    if (!track) {
        return (
            <MainLayout>
                <Box className="flex justify-center pt-7">
                    <CircularProgress/>
                </Box>
            </MainLayout>
        );
    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchTrack();
    };

    return (
        <MainLayout>
            <Grid container className="flex flex-col">
                <Grid container className="my-5 w-full">
                    <img src={API_URLS.BASE + track.picture} className="w-48 h-48 rounded-lg shadow-lg"
                         alt="Track Picture"/>

                    <div className="ml-7">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{track.name}</h1>
                        <Divider/>

                        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Artist - {track.artist}</h2>
                    </div>
                    <div className="ml-auto">
                        <StarsRating disabled value={track.averageRating}/>
                    </div>

                </Grid>
                <p className="my-8 text-gray-600">{track.text}</p>

                <Box className="flex justify-between items-center mb-4 w-full">
                    <h1 className="text-3xl font-bold text-gray-800">Comments</h1>
                    <Button variant='contained' onClick={handleOpen}>Add Comment</Button>
                </Box>

                <div className="space-y-4 mb-10 w-full">
                    {track.comments.length === 0 ? (
                        <NoData message="No comments yet. Start by adding a new comment!" IconComponent={AddCommentIcon} />
                    ) : (
                        sortByDate(track.comments).map((comment, index) => (
                            <CommentCard
                                key={index}
                                {...comment}
                            />
                        ))
                    )}
                </div>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <AddCommentModal trackId={track._id} onClose={handleClose}/>
            </Dialog>
        </MainLayout>
    );
};

export default TrackPage;