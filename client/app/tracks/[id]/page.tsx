import React from 'react';
import {getTrackIds} from '@/api-data/api-tracks';
import TrackPageClient from "@/components/Track";


export async function generateStaticParams() {
    return await getTrackIds();
}

const TrackPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return <TrackPageClient id={id} />;
};

export default TrackPage;