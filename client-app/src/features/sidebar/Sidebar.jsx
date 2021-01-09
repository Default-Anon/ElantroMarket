import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Menu, Tv, Smartphone, Laptop, Computer, Tablet, VideoLabel } from '@material-ui/icons'
import agent from '../../app/api/agent'
import { NavLink } from 'react-router-dom';
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: 36,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: 'gray',
        color: 'white'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
        background: 'gray',
        color: 'white'
    },
    toolbar: {
        backgroundColor: 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    paperSidebar: {
        background: 'gray',
        color: 'white'
    },
}));

export default function Sidebar(props) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const HandleCategoryClicked = (category) => {

    }
    return (
        <Drawer
            variant="permanent"
            classes={{ paper: classes.paperSidebar, root: classes.rootSidebar }}
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton
                    onClick={() => { setOpen(!open); }}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    style={{ paddingLeft: theme.spacing(3) }}
                >
                    <Menu />
                </IconButton>
            </div>
            <Divider />
            <List>
                <NavLink to={{ pathname: '/product/category/TV' }} style={{ color: 'black', textDecoration: "none" }}>
                    <ListItem button key={'TV'}>
                        <ListItemIcon><Tv /> </ListItemIcon>
                        <ListItemText primary={'Телевизоры'} />
                    </ListItem>
                </NavLink>
                <NavLink to={{ pathname: '/product/category/Notebooks' }} style={{ color: 'black', textDecoration: "none" }}>
                    <ListItem button key={'Notebooks'}>
                        <ListItemIcon><Laptop /> </ListItemIcon>
                        <ListItemText primary={'Ноутбуки'} />
                    </ListItem>
                </NavLink>
                <NavLink to={{ pathname: '/product/category/Computers' }} style={{ color: 'black', textDecoration: "none" }}>
                    <ListItem button key={'Computers'}>
                        <ListItemIcon><VideoLabel /> </ListItemIcon>
                        <ListItemText primary={'Компьютеры'} />
                    </ListItem>
                </NavLink>
                <NavLink to={{ pathname: '/product/category/Smartphones' }} style={{ color: 'black', textDecoration: "none" }}>
                    <ListItem button key={'Smartphones'}>
                        <ListItemIcon><Smartphone /></ListItemIcon>
                        <ListItemText primary={'Смартфоны'} />
                    </ListItem>
                </NavLink>
                <NavLink to={{ pathname: '/product/category/Tablets' }} style={{ color: 'black', textDecoration: "none" }}>
                    <ListItem button key={'Tablets'}>
                        <ListItemIcon><Tablet /> </ListItemIcon>
                        <ListItemText primary={'Планшеты'} />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
