import {useEffect, useRef} from 'react';
import {usePlayerStore} from "@/store/playerStore";
import API_URLS from "@/api-data/apiURL";
import {usePlaylistStore} from "@/store/playlistStore";
import {Track} from "@/store/interfaces";

export const useAudio = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const {currentPlaylist} = usePlaylistStore();
    const {pause, volume, active, currentTime, setPause, setVolume, setCurrentTime, setActive} = usePlayerStore();

    useEffect(() => {
        loadAudio();
    }, [active]);


    useEffect(() => {
        if (audioRef.current) {
            if (pause) {
                audioRef.current.pause();
            } else {
                void audioRef.current.play();
            }
        }
    }, [pause]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
        }
        return setActive(null);
    }, []);


    const loadAudio = () => {
        if (audioRef.current && active) {
            audioRef.current.src = API_URLS.BASE + active.audio;
            audioRef.current.onended = currentPlaylist ? playNextTrack : endPlay;
            if (!pause) {
                void audioRef.current.play();
            }
        }
    }

    const endPlay = () => {
        setPause(true);
    };

    const playNextTrack = () => {
        if (currentPlaylist && active) {
            const currentIndex = currentPlaylist.tracks.findIndex((track: Track) => track._id === active._id);
            const nextTrack = currentPlaylist.tracks[currentIndex + 1];
            if (nextTrack) {
                setActive(nextTrack);
            } else {
                setPause(true);
            }
        }
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number(e.target.value) / 100;
        setVolume(volume);
        if (audioRef.current) audioRef.current.volume = volume;
    };

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    };

    const toggleAudio = () => {
        if (!pause) {
            audioRef.current?.pause();
            setPause(true);
        } else {
            void audioRef.current?.play();
            setPause(false);
        }
    };

    return {
        audioRef,
        handleVolume,
        handleTime,
        toggleAudio,
        playNextTrack
    };
};
