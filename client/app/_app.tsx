import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {AppProps} from "next/app";
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from "@/utils/theme";

const MyApp = ({Component, pageProps}: AppProps) => {

    return (<Component {...pageProps} />);
}
export default MyApp;
