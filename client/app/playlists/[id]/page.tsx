import React from 'react';
import PlaylistPageClient from "@/components/Playlist";
import {getPlaylistIds} from "@/api-data/api-playlists";

export async function generateStaticParams() {
    return  await getPlaylistIds();
}

const PlaylistPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return <PlaylistPageClient id={id} />;
};

export default PlaylistPage;
