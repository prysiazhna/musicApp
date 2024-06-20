'use client'
import {TextField, Grid, Box, Card, Button} from '@mui/material';
import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/stepper/StepWrapper";
import FileUpload from '@/components/stepper/FileUpload';
import {useRouter} from "next/navigation";
import {useInput} from "@/hooks/useInput";
import ConfirmationDialog from "@/components/modals/ConfirmationModal";
import axios from "axios";
import API_URLS from "@/api-data/apiURL";
import {useTrackStore} from "@/store/trackStore";

const Page = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const {fetchTracks} = useTrackStore();

    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter()
    const handlePictureChange = (file: any) => {
        setPicture(file);
        setPicturePreview(URL.createObjectURL(file));
    }
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
        formData.append('text', text.value);
        formData.append('artist', artist.value);

        if (picture) {
            formData.append('picture', picture);
        }
        if (audio) {
            formData.append('audio', audio);
        }
        try {
            await axios.post(API_URLS.TRACKS, formData)
            await fetchTracks();
            router.push('/tracks');
        } catch (e) {
            console.log(e);
        }

        setOpen(false);
        router.push('/tracks');
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const isNextDisabled = () => {
        if (activeStep === 0) {
            return !name.value || !artist.value || !text.value;
        } else if (activeStep === 1) {
            return !picture;
        } else if (activeStep === 2) {
            return !audio;
        }
        return false;
    }

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
                                <TextField
                                    {...artist}
                                    sx={{mt: 4}}
                                    label={"Artist"}
                                />
                                <TextField
                                    {...text}
                                    sx={{mt: 4}}
                                    label={"Details"}
                                    multiline
                                    rows={3}
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
                            <Grid container className="flex flex-col items-center justify-center">
                                <FileUpload setFile={setAudio} accept="audio/*">
                                    <div className="flex flex-col items-center">
                                        <Button variant='outlined'>Upload audio</Button>
                                        {audio &&
                                            <Card className="p-4 mt-12">
                                                <div>{audio.name}</div>
                                            </Card>
                                        }
                                    </div>
                                </FileUpload>
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
                title={"Add new track"}
                text={'Are you sure you want to add this track?'}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
};

export default Page;