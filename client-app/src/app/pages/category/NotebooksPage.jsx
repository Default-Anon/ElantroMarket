import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Paper, IconButton } from '@material-ui/core'
import agent from '../../api/agent'
import ProductList from '../../../features/dashboard/ProductList'
import Fab from '@material-ui/core/Fab';
import SortIcon from '@material-ui/icons/Sort';
import { Tooltip } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Menu } from '@material-ui/icons'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '60px',
        paddingLeft: '60px'
    },
    sortedSidebarBtn: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }
}))

const NotebooksPage = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [images, setImages] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [category, setCategory] = useState('Notebooks');
    const onHandleOpenImage = (images) => {
        setImages(images);
        setOpenImage(true);
    }
    const onHandleOpen = () => {
        setOpen(true);
    }
    const onHandleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        agent.Filters.list(category).then((response) => {
            let productsBackup = [];
            response.forEach((product) => {
                productsBackup.push(product);
            })
            setProducts(productsBackup);
        })
    }, []);
    return (
        <>
            {openImage && (
                <Lightbox mainSrc={images[photoIndex].imageUrl}
                    nextSrc={images[(photoIndex + 1) % images.length].imageUrl}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length].imageUrl}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                    onCloseRequest={() => { setOpenImage(false); setPhotoIndex(0) }} />
            )}
            <Grid container className={classes.root} spacing={2}>
                <ProductList products={products} openImage={(image) => { onHandleOpenImage(image) }} />
                <div className={classes.sortedSidebarBtn}>
                    <Tooltip title={<p style={{ fontSize: '12px' }}>Сортировать</p>} placement="top">
                        <Fab color="primary" aria-label="sort" onClick={onHandleOpen}>
                            <SortIcon />
                        </Fab>
                    </Tooltip>
                </div>
                <Drawer anchor="right" open={open} onClose={onHandleClose}>
                    <IconButton
                        onClick={() => { setOpen(!open); }}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        style={{}}
                    >
                        <Menu />
                    </IconButton>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
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
            </Grid >
        </>
    );
}

export default NotebooksPage;