import React from 'react';
import {Typography} from '@mui/material';

interface NoDataProps {
    message: string;
    IconComponent: React.ElementType;
}

const NoData: React.FC<NoDataProps> = ({message, IconComponent}) => {
    return (
        <div className="flex flex-col items-center justify-center pt-24 w-full">
            <IconComponent fontSize="large" className="text-gray-500 text-7xl mb-6"/>
            <Typography variant="h6" color="textSecondary">{message}</Typography>
        </div>
    );
};

export default NoData;
