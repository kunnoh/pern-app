import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import './forgot-password';
import Button from '@material-ui/core/Button';
import { TextField, makeStyles } from '@material-ui/core';
import { login } from "../../../actions/auth.actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        paddingTop: '60px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
        },
        '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
        },
    },
}));

export default function ForgotPassword(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const form = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();

    // create state variables
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        dispatch(login(email))
            .then(() => {
                props.history.push("/");
                window.location.reload();
            }).catch(() => {
                setLoading(false);
            }
        );
    };
    
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
  
    if(currentUser) {
        return <Navigate to="/"/>
    }
    return(
        <div className='flex column flex-center'>
            <form 
                ref={form}
                className={classes.root}
                onSubmit={handleSubmit}>
                <h2>reset password</h2>

                {message && (
                    <div className="alert-danger" role="alert">
                        <span>{message}</span>
                    </div>
                )}

                <TextField 
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <div className='flex column'>
                    <Button type="submit" variant="contained" color="primary">
                        send reset email
                    </Button>
                </div>
            </form>
            {loading && (
                <div className="flex flex-center spinner-wrapper">
                    <span>loading ...</span>
                </div>
            )}
        </div>
    )
}