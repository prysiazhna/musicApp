const ENV = process.env.NEXT_PUBLIC_API_URL;


const API_URLS = {
    ADD_TRACK: `${ENV}/tracks/create`,
    TRACKS: `${ENV}/tracks`,
    ALL_TRACKS: `${ENV}/tracks/all`,
    PLAYLISTS: `${ENV}/playlists`,
    COMMENT: `${ENV}/tracks/comment`,
    BASE: `${ENV}/`,
};
export default API_URLS;