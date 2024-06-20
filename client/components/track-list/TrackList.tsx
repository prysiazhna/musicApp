import React from 'react';
import TrackItem from './TrackItem';
import { List } from '@mui/material';
import { Track } from "@/store/interfaces";
import InfiniteScroll from 'react-infinite-scroll-component';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import NoData from "@/components/NoData";

interface TrackListProps {
    tracks: Track[];
    isDelete?: boolean;
    fetchMoreTracks?: () => Promise<void>;
    hasMore?: boolean;
    useInfiniteScroll?: boolean;
}

const TrackList = ({ tracks, isDelete = false, fetchMoreTracks = () => Promise.resolve(), hasMore = false, useInfiniteScroll = false }: TrackListProps) => {

    if (!tracks.length) {
        return (<NoData message="No tracks available. Start by adding a new track!" IconComponent={MusicNoteIcon} />);
    }

    const renderTrackList = () => (
        <List className="bg-gray-100 p-4 rounded-lg shadow">
            {tracks.map((track) => (
                <TrackItem key={track._id} track={track} isDelete={isDelete} />
            ))}
        </List>
    );

    return (
        <>
            {useInfiniteScroll ? (
                <InfiniteScroll
                    dataLength={tracks.length}
                    next={fetchMoreTracks}
                    hasMore={hasMore}
                    loader={<></>}
                    className="infiniteScroll"
                >
                    {renderTrackList()}
                </InfiniteScroll>
            ) : (
                renderTrackList()
            )}
        </>
    );
};

export default TrackList;
