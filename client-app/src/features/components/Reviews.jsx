import React from 'react';
import { Typography, InputLabel, Box, Container } from '@material-ui/core';
import { makeStyles, theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.only("xs")]: {
            fontSize: '23px'
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: '30px'
        },
        paddingTop: '10px'
    },
}))
const Reviews = () => {
    const classes = useStyles();
    return (
        <Box display="flex" flexDirection="column" style={{ border: '1px solid black', marginTop: 10 }} minWidth="30vw">
            <Typography variant="h2" color="primary" className={classes.title}>
                Отзывы
            </Typography>
            <Box>
                <Box display="flex" style={{ float: 'left' }}>
                    <InputLabel>Написать отзыв</InputLabel>
                </Box>
            </Box>
        </Box>
    );
}

export default Reviews;
