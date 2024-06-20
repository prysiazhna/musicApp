'use client';
import { createTheme } from '@mui/material/styles';

export const primaryColor='#155e75';
export const secondaryColor='#0B323E';

export  const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        success: {
            main: "#fff",
        }
    }
});
