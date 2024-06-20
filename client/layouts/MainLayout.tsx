import React, {ReactNode, useEffect} from 'react';
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Player from "@/components/player/Player";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <>
            <Navbar/>
                <Container className="w-full flex justify-center">
                    {children}
                </Container>
            <Player/>
        </>
    );
};

export default MainLayout;