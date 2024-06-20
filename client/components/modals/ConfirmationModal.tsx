import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    text:string;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, title, text, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}>

            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>

            <DialogActions className="mb-2 mr-2">
                <Button onClick={onClose} variant='outlined'>Cancel</Button>
                <Button onClick={onConfirm} variant='contained'>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
