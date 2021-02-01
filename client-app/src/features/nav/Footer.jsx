import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, ButtonGroup } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            marginLeft: '12vw'
        },
        marginLeft: '5vw',
        maxWidth: '94vw',
        minHeight: 300,
        backgroundColor: 'gray',
        color: '#17041c',
        marginTop: '40px'
    },
    boxColumnElements: {
        paddingTop: '10px'
    }
}))

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                    <Box>
                        <Button variant="text" color="inherit" className={classes.boxColumnElements}>
                            Вакансии
                        </Button>
                    </Box>
                    <Box className={classes.boxColumnElements}>
                        <Button variant="text" color="inherit">О компании</Button>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Box>
                        <Button variant="contained" className={classes.boxColumnElements}>Пункты выдачи</Button>
                    </Box>
                    <Box className={classes.boxColumnElements} display="flex" flexDirection="column">
                        <Button variant="contained" color="inherit">Мы в ВК</Button>
                        <Button variant="text" color="inherit">Мы в Facebook</Button>
                        <Button variant="text" color="inherit">Мы в Twitter</Button>
                        <Button variant="text" color="inherit">Мы в Instagram</Button>
                        <Button variant="text" color="inherit">Мы в Telegram</Button>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Box>
                        <Button variant="text" color="inherit" className={classes.boxColumnElements}>Вакансии</Button>
                    </Box>
                    <Box className={classes.boxColumnElements}>
                        <Button variant="text" color="inherit">Вакансии</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Footer;
