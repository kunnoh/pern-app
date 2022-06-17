import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { TextField, makeStyles } from '@material-ui/core';
import { register } from "../../../actions/auth.actions";
import './register.css';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
        }
    },
}));

export default function Register(props) {
    const form = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // create state variables
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        dispatch(register(firstname, lastname, email, password))
            .then(() => {
                setLoading(false);
                setSuccessful(true);
                navigate("/login");
            }).catch(() => {
                setLoading(false);
            }
        );
    };
  
    if(isLoggedIn) {
        return <Navigate to="/"/>
    }

    return(
        <div className='flex column flex-center'>
            <form 
                ref={form}
                className={classes.root}
                onSubmit={handleSubmit}>
                <h2>register new account</h2>

                {message && (
                    <div className={ successful ? "alert-success" : "alert-danger" } role="alert">
                        <span>{message}</span>
                    </div>
                )}
                <TextField
                    label="firstname"
                    variant="filled"
                    type="text"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                    required
                />
                <TextField
                    label="lastname"
                    variant="filled"
                    type="text"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                    required
                />

                <TextField 
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <div className='flex column'>
                    <Button type="submit" variant="contained" color="primary">
                        register
                    </Button>
                    <div className='flex actions'>
                        I already have an account &nbsp;<Link to={"/login"}>login</Link>
                    </div>
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