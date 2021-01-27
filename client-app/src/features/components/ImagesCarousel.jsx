import React, { useState, useEffect } from 'react';
import { Box, Button, } from '@material-ui/core'
import { makeStyles, theme } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
const useStyles = makeStyles((theme) => ({
    imagesDiv: {
        [theme.breakpoints.only("xs")]: {
            height: '300px'
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: '30px'
        },
        maxWidth: '700px',
        justifyContent: 'center',
        display: 'flex',
        paddingTop: '10px'
    },
    Img: {
        [theme.breakpoints.only('xs')]: {
            height: '300px'
        },
        [theme.breakpoints.up('sm')]: {
            height: '500px'
        }
    },
}))
const ImagesCarousel = (props) => {
    const [images, setImages] = useState(props.images);
    const classes = useStyles();
    return (
        <Box display="flex" justifyContent="center">
            <div className={classes.imagesDiv}>
                <Carousel showArrows={true} showThumbs={false} >
                    {typeof (images) === 'undefined' || images === null ?
                        <p>Images not found</p>
                        :
                        images.map((image, key) => {
                            return (
                                <div key={key}>
                                    <img src={image.imageUrl} className={classes.Img} />
                                </div>
                            )
                        })}
                </Carousel>
            </div>
        </Box >
    );
}

export default ImagesCarousel;
