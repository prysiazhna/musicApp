'use client'
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Container, Grid, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarRateIcon from '@mui/icons-material/StarRate';
import AlbumIcon from '@mui/icons-material/Album';
import FeatureCard from "@/components/FeaturedCard";

const featureCardData = [
    {
        icon: MusicNoteIcon,
        title: "Listen to Music",
        description: "Enjoy a vast collection of tracks from various genres."
    },
    {
        icon: AddCircleIcon,
        title: "Add Tracks",
        description: "Upload and manage your own music tracks."
    },
    {
        icon: AlbumIcon,
        title: "Create Playlists",
        description: "Organize your tracks into playlists."
    },
    {
        icon: StarRateIcon,
        title: "Comment and Rate",
        description: "Share your thoughts and rate your favorite songs."
    }
];

export default function Home() {
    return (
        <MainLayout>
            <Container sx={{ padding: '32px 0' }}>
                <Typography variant="h2" component="h1" className="text-center" sx={{ marginBottom: '32px'}}>
                    Welcome to MusicApp
                </Typography>
                <Grid container spacing={4}>
                    {featureCardData.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Typography className="ml-auto text-md text-center mx-auto" sx={{ marginTop: '32px' }}>
                    All music used on this website is royalty-free and complies with legal copyright regulations
                </Typography>
            </Container>
        </MainLayout>
    );
}
