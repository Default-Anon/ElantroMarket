import React, { useState, useEffect } from 'react';
import { makeStyles, theme } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system'
import { Link, Box, Card, Select, CardMedia, Container, Typography, CardActionArea, CardContent, Paper, Button, TextField, TextareaAutosize, ButtonGroup, InputLabel, MenuItem, FormControl, Switch, FormGroup } from '@material-ui/core';
import Logo from '../../app/images/logo.jpg'
import agent from '../../app/api/agent'
import { Add, Edit, Delete } from '@material-ui/icons'
import { FormControlLabel } from '@material-ui/core';
import Guid from 'guid'
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '37px',
        marginTop: '64px',
        [theme.breakpoints.only("xs")]: {
            width: '85vw'
        },
        [theme.breakpoints.only("sm")]: {
            width: '87vw'
        },
        [theme.breakpoints.only("md")]: {
            width: '90vw'
        },
        [theme.breakpoints.only("lg")]: {
            width: '92vw'
        },
    },
    box: {
        [theme.breakpoints.only('sm')]: {
            width: '87vw'
        },
        [theme.breakpoints.only('xs')]: {
            width: '84vw'
        }
    },
    boxImage: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '420px',
        [theme.breakpoints.only('lg')]: {
            maxWidth: '700px'
        },
        border: '1px solid yellow'
    },
    boxName: {
        border: '1px solid black',
        minWidth: '420px',
        [theme.breakpoints.only('sm')]: {
            width: '87vw'
        },
        [theme.breakpoints.only('xs')]: {
            width: '82vw'
        }
    },
    paper: {
    },
    boxBtns: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardMediaStyles: {
        objectFit: 'cover'
    },
    InfoUser: {
        display: 'flex',
        minHeight: '200px',
        minWidth: '420px',
        backgroundColor: '#521b44',
        color: 'pink',
    },
    adminForms: {
        minWidth: '420px',
        border: '1px solid green',
        marginTop: '10px',
        [theme.breakpoints.only('sm')]: {
            width: '87vw'
        },
        [theme.breakpoints.only('xs')]: {
            width: '82vw'
        }
    },
    adminFormsCreate: {
        border: '2px solid black',
        minWidth: '420px',
        [theme.breakpoints.only("lg")]: {
            width: '550px'
        },
        maxWidth: '700px',
    },
    textFieldStyles: {
        color: 'black',
    },
    adminBoxButtons: {
        display: 'flex'
    },
    textAreaDescription: {
        height: '250px',
        [theme.breakpoints.only('xs')]: {
            width: '410px'
        },
        [theme.breakpoints.only('lg')]: {
            width: '540px'
        },
        fontSize: '18px'
    }
}))

const Profile = () => {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [signOut, setSignOut] = useState(false);
    const [productId, setId] = useState("");
    const [images, setImages] = useState([1, 2, 3, 4, 5, 6, 7])
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const [createImages, setCreateImages] = useState([{}]);
    const [lookImages, setLookImages] = useState(false);
    const [labelCounter, setImagesLabelCounter] = useState('');
    const SetImagesHandler = (imageUrl, index) => {
        let new_item = [{ ...item }];
        console.log(`imgUrlOld: ${new_item[0].images[index].imageUrl}`);
        new_item[0].images[index].imageUrl = imageUrl;
        setItem(new_item[0]);
        new_item = [];
        console.log(item)
    }
    const SetCreateImagesHandler = (imageUrl, i) => {
        if (labelCounter === "") {
            setId(Guid.create());
        }
        if (i === 1) {
            setCreateImages([{ 'productId': labelCounter, 'imageUrl': imageUrl, 'imageId': Guid.create() }])
        }
        else {
            let imagesBackup = [];
            createImages.map((item) => {
                imagesBackup.push(item);
            })
            imagesBackup.push({ 'productId': labelCounter, 'imageUrl': imageUrl, 'imageId': Guid.create() });
            setCreateImages(imagesBackup);
            setItem({ ...item, 'images': [...createImages] })
            console.log(`item: ${{ ...item }} `);
        }
    }
    const CreateButtonHandler = () => {
        console.log(item);
        agent.Products.create(item).then(() => setItem({}))

    }
    const EditButtonHandler = () => {
        console.log(item);
        if (item.productId != '') {
            agent.Products.update(item.productId, item);
        }
    }
    const DeleteButtonHandler = () => {
        if (item.productId != '') {
            agent.Products.delete(item.productId).then(() => { setItem({}); });
        }
    }
    const SignOutButtonClicked = () => {
        localStorage.removeItem('jwt');
        setSignOut(true);
    }
    const setUserHandler = (response) => {
        setUser(response);
    }
    const setItemHandler = (event) => { setItem(event.target.value); };
    const setItemsHandler = (response) => {
        let products = [];
        response.forEach((product) => {
            products.push(product);
        })
        setItems(products);
    }
    useEffect(() => {
        if (Object.keys(user).length === 0) {
            agent.SignInManager.currentUser()
                .then((response) => { setUserHandler(response) });
        }
        if (Object.keys(items).length === 0) {
            agent.Products.list()
                .then((response) => {
                    setItemsHandler(response);
                });
        }
    });
    return (
        <Container className={classes.root}>
            <Box className={classes.box}
                justifyContent="space-between"
                flexDirection="row" display="flex"
                flexWrap="wrap">
                <Box>
                    <Card className={classes.boxImage}>
                        <Link href="http://localhost:3000">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    src={Logo}
                                    className={classes.cardMediaStyles}
                                />
                            </CardActionArea>
                        </Link>
                    </Card>
                </Box>
                <Box className={classes.boxName} justifyContent="space-between" display="flex" flexDirection='column'>
                    <Card className={classes.InfoUser} color="inherit">
                        <CardActionArea>
                            <CardContent>
                                <Typography style={{ fontSize: '25px', textAlign: 'center' }}>{user.username}</Typography>
                                <Typography style={{ fontSize: '32px', textAlign: 'center' }}>Personal discount: {user.bonus}</Typography>
                                <Typography style={{ fontSize: '25px', textAlign: 'center' }}>Status: {user.role}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
            {
                user.role === 'admin' ?
                    <>
                        <Box
                            justifyContent="space-between"
                            flexDirection="row" display="flex"
                            flexWrap="wrap" className={classes.adminForms}>
                            <Box maxWidth="550px">
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    inputProps={{ className: classes.textFieldStyles }}
                                    fullWidth
                                    autoFocus
                                    value={labelCounter}
                                    label="Id"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => { setItem({ ...item, 'productId': event.target.value }) }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    inputProps={{ className: classes.textFieldStyles }}
                                    required={true}
                                    fullWidth
                                    autoFocus
                                    value={item.title}
                                    label="Title"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => { setItem({ ...item, 'Title': event.target.value }) }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    inputProps={{ className: classes.textFieldStyles }}
                                    fullWidth
                                    autoFocus
                                    label="Name"
                                    value={item.name}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => { setItem({ ...item, 'Name': event.target.value }) }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    inputProps={{ className: classes.textFieldStyles }}
                                    label="Category"
                                    value={item.category}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => { setItem({ ...item, 'Category': event.target.value }) }}
                                />
                                <TextareaAutosize
                                    placeholder="Description"
                                    className={classes.textAreaDescription}
                                    rowsMin={3}
                                    defaultValue={item.description}
                                    onChange={(event) => { setItem({ ...item, 'Description': event.target.value }) }}
                                />
                                <Box>
                                    {lookImages === false ? images.map((item, i) => {
                                        if (i === images.length) {
                                            setLookImages(true);
                                        }
                                        if (i === 0) {
                                            return (
                                                <TextField
                                                    key={i}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    inputProps={{ className: classes.textFieldStyles }}
                                                    autoFocus
                                                    label="Images"
                                                    placeholder="ImageUrl ...."
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={(event) => { typeof (event.target.value) != 'undefined' && SetCreateImagesHandler(`${event.target.value} `, item); setItem({ ...item, 'mainImage': event.target.value }); }}
                                                />
                                            )
                                        }
                                        return (
                                            <TextField
                                                key={i}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                inputProps={{ className: classes.textFieldStyles }}
                                                autoFocus
                                                label="Images"
                                                placeholder="ImageUrl ...."
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(event) => { typeof (event.target.value) != 'undefined' && SetCreateImagesHandler(`${event.target.value} `, item); }}
                                            />
                                        );
                                    }) : <Typography>images label error</Typography>}
                                </Box>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    inputProps={{ className: classes.textFieldStyles }}
                                    autoFocus
                                    label="Price"
                                    value={item.price}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => { setItem({ ...item, 'Price': event.target.value }) }}
                                />
                            </Box>
                            <Box
                                justifyContent="space-between"
                                flexDirection="column" display="flex">
                                <FormGroup>
                                    <Box>
                                        <Button variant="contained" startIcon={<Add />}
                                            onClick={CreateButtonHandler} color="primary" >
                                            Create
                                    </Button>
                                    </Box>
                                    <FormControlLabel
                                        control={<Switch
                                            onChange={() => { labelCounter != '' ? setImagesLabelCounter([]) : setImagesLabelCounter(Guid.create()) }}
                                            name="GenerateId"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                        label="Generate Id"
                                    />
                                </FormGroup>
                            </Box>
                        </Box>
                    </>
                    :
                    <Button>Client</Button>
            }
            <Button variant="contained" color="primary" onClick={SignOutButtonClicked}>
                Sign Out
            </Button>
            { signOut && <p>Вы успешно вышли из аккаунта</p>}
        </Container >
    );
}

export default Profile;
