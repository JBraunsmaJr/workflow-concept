import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {generateGUID} from "./App"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Tooltip
} from "@mui/material";
import {useState} from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu"
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {Position, ReactFlowInstance, useReactFlow} from "reactflow";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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

export interface EditorNodeButton {
    name: string,
    nodeId: string,
    icon: ReactJSXElement,
    onClick?: (flow: ReactFlowInstance<any,any>)=>void,
    defaultData?: any
}

export interface MiniDrawerProps {
    nodeButtons?: EditorNodeButton[]
}

export default function MiniDrawer(props: MiniDrawerProps) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const flow = useReactFlow();
    const nodeButtons = props.nodeButtons ?? [];

    const handleDrawerOpen = ()=>{
        setOpen(true);
    }

    const handleDrawerClose = ()=>{
        setOpen(false);
    }

    return(
        <Box sx={{ display: "flex" }}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: "none"})
                    }}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Workflow Editor
                    </Typography>
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
                    {nodeButtons.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: "block" }}>
                            <Tooltip title={item.name} placement="right">
                                <ListItemButton
                                    draggable
                                    onDrag={event => {
                                        event.preventDefault();
                                    }}
                                    onDragEnd={event => {
                                        event.preventDefault();
                                        flow.addNodes([{
                                            type: item.nodeId,
                                            id: generateGUID(),
                                            position: {
                                                x: event.clientX,
                                                y: event.clientY
                                            },
                                            data: item.defaultData ?? { label: "" }
                                        }])
                                        console.log("target: ", event)
                                        console.log("data transfer: ", event.dataTransfer)
                                        console.log("type: ", item.nodeId);
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center"
                                        }}>
                                        {item.icon}
                                    </ListItemIcon>
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}