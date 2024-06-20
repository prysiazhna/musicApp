import React, {useState} from 'react';
import {TextField, DialogActions, DialogContent, DialogTitle, Typography, Button, Box} from '@mui/material';
import axios from 'axios';
import API_URLS from '@/api-data/apiURL';
import StarsRating from 'react-star-rate';

interface CommentFormDialogProps {
    trackId: string;
    onClose: () => void;
}

const AddCommentModal: React.FC<CommentFormDialogProps> = ({trackId, onClose}) => {
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState<number>(0);

    const handleAddComment = async () => {
        try {
            await axios.post(API_URLS.COMMENT, {
                username,
                text,
                rating,
                trackId
            });

            setUsername('');
            setText('');
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    const isSaveDisabled = () => {
        return !username || !text || !rating;
    }

    return (
        <>
            <DialogTitle>
                <div>Add Comment</div>
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Comment"
                    fullWidth
                    multiline
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <Box display="flex" justifyContent="center" mt={2}>
                    <StarsRating
                        value={rating}
                        onChange={value => {
                            if (value !== undefined) {
                                setRating(value);
                            }
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions className="mx-4 mb-3">
                <Button onClick={onClose} variant='outlined'>Cancel</Button>
                <Button onClick={handleAddComment} variant='contained' disabled={isSaveDisabled()}>Send</Button>
            </DialogActions>
        </>
    );
};

export default AddCommentModal;
