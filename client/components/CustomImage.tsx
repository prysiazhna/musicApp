import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import API_URLS from "@/api-data/apiURL";


const CustomImage = ({ src }: { src: string }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="relative w-full h-48">
            {!imageLoaded && (
                <Skeleton variant="rectangular" width="100%" height="100%" className="absolute inset-0" />
            )}
            <img
                src={API_URLS.BASE + src}
                alt='img'
                className={`w-full h-48 object-cover rounded-t-md shadow-lg transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
            />
        </div>
    );
};

export default CustomImage;
