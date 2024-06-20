'use client'
import * as React from 'react';
import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Divider,
    Tooltip,
    CssBaseline,
    ListItemText,
    Drawer as MuiDrawer,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import HomeIcon from '@mui/icons-material/Home';
import {styled, Theme, CSSObject} from '@mui/material/styles';

const menuItems = [
    {text: 'Home', href: '/', icon: <HomeIcon/>},
    {text: 'Tracks', href: '/tracks', icon: <AudioFileIcon/>},
    {text: 'Playlists', href: '/playlists', icon: <PlaylistPlayIcon/>},
]
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const router: AppRouterInstance = useRouter();

    const handleDrawerOpen = (): void => {
        setOpen(true);
    };

    const handleDrawerClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <div className="flex">
                <CssBaseline/>
                <AppBar
                    position="fixed" open={open} className="transition-all duration-300">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{marginRight: 2, display: open ? 'none' : 'block'}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5" noWrap component="div">
                            MusicApp
                        </Typography>
                        <LibraryMusicIcon className="ml-2"/>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {menuItems.map(({text, href, icon}, index) => (
                            <Tooltip title={!open ? text : ''} placement="right" key={href} arrow>
                                <ListItem button key={href} onClick={() => router.push(href)} className="flex">
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        marginRight: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} className={`${open ? 'opacity-100' : 'opacity-0'}`}/>
                                </ListItem></Tooltip>
                        ))}
                    </List>
                </Drawer>
                <main className="flex-grow p-3">
                    <DrawerHeader/>
                </main>
            </div>
        </>
    );
}