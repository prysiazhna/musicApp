'use client'
import {Checkbox, TextField, Grid, Box, List, Card, ListItem, ListItemText, Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/stepper/StepWrapper";
import FileUpload from '@/components/stepper/FileUpload';
import {useRouter} from "next/navigation";
import {useInput} from "@/hooks/useInput";
import ConfirmationDialog from "@/components/modals/ConfirmationModal";
import axios from "axios";
import API_URLS from "@/api-data/apiURL";
import {useTrackStore} from "@/store/trackStore";
import {fetchAllTracks} from "@/api-data/api-tracks";
import {Track} from "@/store/interfaces";

const Page = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [allTracks, setAllTracks] = useState<Track[]>([]);
    const { fetchTracks } = useTrackStore();
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

    const name = useInput('');
    const router = useRouter();
    const handlePictureChange = (file:any) => {
        setPicture(file);
        setPicturePreview(URL.createObjectURL(file));
    }

    useEffect(() => {
        const loadTracks = async () => {
            const data = await fetchAllTracks();
            setAllTracks(data);
        };
        loadTracks();
    }, []);

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1);
        } else {
            setOpen(true);
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    const handleConfirm = async () => {
        const formData = new FormData();
        formData.append('name', name.value);

        if (picture) {
            formData.append('cover', picture);
        }

        if (selectedTracks.length > 0) {
            selectedTracks.forEach(track => {
                formData.append('tracks', track);
            });
        }
        try {
            await axios.post(API_URLS.PLAYLISTS, formData);
            await fetchTracks();
            router.push('/playlists');
        } catch (e) {
            console.log(e);
        }

        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const isNextDisabled = () => {
        if (activeStep === 0) {
            return !name.value;
        } else if (activeStep === 1) {
            return !picture;
        } else if (activeStep === 2) {
            return !selectedTracks.length;
        }
        return false;
    }


    const handleTrackSelect = (trackId: string) => {
        setSelectedTracks(prevSelectedTracks => {
            const newSelectedTracks = [...prevSelectedTracks];
            if (newSelectedTracks.includes(trackId)) {
                newSelectedTracks.splice(newSelectedTracks.indexOf(trackId), 1);
            } else {
                newSelectedTracks.push(trackId);
            }
            return newSelectedTracks;
        });
    };

    return (
        <MainLayout>
            <Box className="flex flex-col w-full">
                <StepWrapper activeStep={activeStep}>
                    <div className="p-10">
                        {activeStep === 0 &&
                            <Grid container direction={"column"}>
                                <TextField
                                    {...name}
                                    label={"Track title"}
                                />
                            </Grid>
                        }
                        {activeStep === 1 &&
                            <Grid container className="flex flex-col items-center justify-center">
                                <FileUpload setFile={handlePictureChange} accept="image/*">
                                    <div className="flex flex-col items-center">
                                        <Button variant='outlined'>Upload image</Button>
                                        {picturePreview &&
                                            <Card className="p-4 mt-4">
                                                <img src={picturePreview} alt="Preview" className="max-h-40"/>
                                            </Card>
                                        }
                                    </div>
                                </FileUpload>
                            </Grid>

                        }
                        {activeStep === 2 &&
                            <Grid container className="flex flex-col items-center justify-center w-full">
                                <div className="h-72 overflow-y-auto w-full">
                                    <List>
                                        {allTracks.map((track) => (
                                            <ListItem key={track._id} className="flex flex-row items-center">
                                                <Checkbox
                                                    checked={selectedTracks?.includes(track._id)}
                                                    onChange={() => handleTrackSelect(track._id)}
                                                    name={track.name}
                                                    className="mr-2 p-0"
                                                />
                                                <ListItemText>{`${track.name} - ${track.artist}`}</ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </Grid>
                        }
                    </div>
                </StepWrapper>
                <Grid container justifyContent='space-around' className="pt-10">
                    <Button onClick={back} disabled={activeStep === 0} variant='outlined'>Back</Button>
                    <Button onClick={next} disabled={isNextDisabled()} variant='outlined'>Next</Button>
                </Grid>
            </Box>


            <ConfirmationDialog
                open={open}
                title={"Add new playlist"}
                text={'Are you sure you want to add this playlist?'}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
};

export default Page;