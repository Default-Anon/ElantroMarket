import React, { useState, useEffect } from 'react';
import { Typography, InputLabel, Box, Container, TextField, Paper, IconButton } from '@material-ui/core';
import { makeStyles, theme } from '@material-ui/core/styles';
import { Label, Send } from '@material-ui/icons';
import { InputBase } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import agent from '../../app/api/agent'
import { Avatar } from '@material-ui/core';
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
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#262927",
        [theme.breakpoints.only('sm')]: {
            maxWidth: 600
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    mainBoxReviews: {
        [theme.breakpoints.only('sm')]: {
            maxWidth: 100,
            border: '4px solid yellow'
        }
    }

}))
const Reviews = (props) => {
    const classes = useStyles();
    const [comments, setComments] = useState(props.comments);
    const [id, setId] = useState(props.productId);
    const [comment, setComment] = useState({ 'name': null, 'productId': null, 'body': '' });
    const [user, setUser] = useState({});
    const SendButtonClicked = () => {
        console.log(comment);
        if (comment.body != '' || user != {}) {
            agent.Comments.create(comment);
        }
    }
    useEffect(async () => {
        await agent.SignInManager.currentUser()
            .then((response) => {
                setUser(response);
            })
        setComment({ ...comment, 'name': user.username, 'productId': id });
    }, [user]);
    return (
        <Box display="flex" flexDirection="column" style={{ border: '1px solid black', marginTop: 10 }} minWidth="30vw">
            <Typography variant="h2" color="primary" className={classes.title}>
                Отзывы
            </Typography>
            <Box>
                <Box display="flex" flexDirection="column">
                    {
                        comments === [] ? <></> : comments.map((comment) => {
                            return (
                                <Paper elevation={3} square color="inherit" style={{ backgroundColor: "#262927" }} key={comment.id}>
                                    <Box>
                                        <Box display="flex" flexDirection="row" alignItems="center">
                                            <Box>
                                                <Avatar style={{ backgroundColor: 'gray', color: 'yellow' }}>{comment.name[0]}</Avatar>
                                            </Box>
                                            <Box>
                                                <InputLabel style={{ color: 'gray', marginLeft: '10px', fontWeight: 'bold' }}>{comment.name.toUpperCase()}</InputLabel>
                                            </Box>
                                        </Box>
                                        <Box display="flex">
                                            <InputLabel style={{ paddingTop: '15px', fontSize: '20px', color: 'gray', textAlign: 'left' }} >{comment.body}</InputLabel>
                                        </Box>
                                    </Box>
                                </Paper>
                            )
                        })
                    }
                </Box>
                <Box className={classes.root}>
                    <InputBase
                        color="inherit"
                        className={classes.input}
                        placeholder="Написать отзыв"
                        style={{ color: 'white' }}
                        onChange={async (event) => { await setComment({ ...comment, 'body': event.target.value }) }}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary"
                        className={classes.iconButton}
                        onClick={SendButtonClicked}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Box>
        </Box >
    );
}

export default Reviews;
