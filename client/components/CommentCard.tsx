import React from 'react';
import {format} from 'date-fns';
import StarsRating from 'react-star-rate';
import {Comment} from "@/store/interfaces"

const starStyles = {
    style: {
        fontSize: '16px'
    }
}
const CommentCard: React.FC<Comment> = ({createdAt, username, rating, text}) => {
    const formattedDate = format(new Date(createdAt), 'MM/dd/yyyy, HH:mm');
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md flex flex-col">
            <div className="flex flex-row justify-between">
                <div className="text-gray-500 text-sm">{formattedDate}</div>
                <StarsRating style={{...starStyles}} disabled value={rating}/>
            </div>
            <div className="font-semibold text-gray-800">{username}</div>
            <div className="text-gray-600 mt-2">{text}</div>
        </div>
    );
};

export default CommentCard;
