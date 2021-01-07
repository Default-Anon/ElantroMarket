import React from 'react';
import { makeStyles, theme } from '@material-ui/core/styles';
import Login from './Login'
import { BrowserRouter, Route } from 'react-router-dom';
import SignUp from './SignUp';
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '100px',
        paddingTop: '50px'
    }

}));
const SignIn = () => {
    const classes = useStyles();
    return (
        <Login />
    );
}

export default SignIn;
