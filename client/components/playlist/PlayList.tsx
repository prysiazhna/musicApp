'use client'
import React from 'react';
import { Card, IconButton, CardContent, Typography, Grid } from '@mui/material';
import { useRouter } from "next/navigation";
import { Playlist } from "@/store/interfaces";
import CustomImage from "@/components/CustomImage";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import NoData from "@/components/NoData";
import { deletePlaylist } from "@/api-data/api-playlists";
import {usePlaylistStore} from "@/store/playlistStore";

const PlayList = ({ playlists }: { playlists: Playlist[] }) => {
    const router = useRouter();
    const { fetchPlaylists } = usePlaylistStore();

    if (!playlists.length) {
        return (<NoData message="No playlists available. Start by creating a new playlist!" IconComponent={PlaylistAddIcon} />);
    }

    const handleDelete = async (e:React.MouseEvent, id: number) => {
        e.stopPropagation();
        await deletePlaylist(id);
        fetchPlaylists();
    };

    return (
        <Grid container spacing={4}>
            {playlists.map((playlist) => (
                <Grid item key={playlist._id} xs={12} sm={6} md={3}>
                    <Card className="hover:shadow-xl transition-shadow duration-300" onClick={() => router.push('/playlists/' + playlist._id)}>
                        <CustomImage src={playlist.cover} />
                        <CardContent className="flex flex-row justify-between items-center">
                            <Typography gutterBottom variant="h6" component="div">
                                {playlist.name}
                            </Typography>
                            <IconButton size='small' onClick={(e) => handleDelete(e, playlist._id)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PlayList;
