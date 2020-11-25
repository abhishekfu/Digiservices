import React, { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, FormControl, TextField, ButtonBase, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Fade} from 'react-reveal'
import { Auth } from 'aws-amplify';
import { useSnackbar } from 'notistack';
import Link from '../../components/Link'
const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #006A4E',
        maxWidth: '40vw',
        marginTop: theme.spacing(10),
        boxShadow:'10px 10px 19px 0px rgba(11,102,22,1)'
    },
    title: {
        padding: theme.spacing(1),
        fontWeight: 'bold',
        backgroundColor: '#006A4E'
    },
    form: {
        padding: theme.spacing(4)
    },
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    btn: {
        backgroundColor: '#006A4E',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));


function AddNewPassword({email,showLoginPage}) {
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState({
        code: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleCodeChange = (e) => {
        setState(prevState => {
            return { ...prevState, code: e.target.value }
        })
    }
    const handlePasswordChange = (e) => {
        setState(prevState => {
            return { ...prevState, password: e.target.value }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        Auth.forgotPasswordSubmit(email,state.code, state.password)
            .then((response) => {
                enqueueSnackbar('Successfully updated the password.',{variant:'success'});
                setLoading(false);
                showLoginPage();
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }

    const classes = useStyles();
    return (
        <Grid container style={{ marginTop: '30px' }} direction='column' justify='center' alignItems='center'>
            {error && (<Fade top>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                     <strong>{error}</strong>
                </Alert>
                </Fade>
            )}
            <Grid className={classes.root} container justify='flex-start' alignItems='center'>
                <Grid item xs={12}>
                    <Typography color='secondary' className={classes.title} align='center' variant="h6">RESET PASSWORD</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.form} container direction='column'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.code} type='number' autoFocus required label="Verification code" onChange={(e) => handleCodeChange(e)} />
                                </FormControl>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.password} required type='password' label="New Password" onChange={(e) => handlePasswordChange(e)} />
                                </FormControl>
                            </Grid>
                            <Grid style={{ marginTop: '20px' }} item >
                            <Grid container direction='row-reverse' justify='space-between' alignItems='center'>
                                <Grid item>
                                <ButtonBase disabled={loading} type='submit'>
                                    {loading ? <CircularProgress color="inherit" /> :
                                        <Typography align='right' color='secondary' className={classes.btn} variant='button'>SUBMIT</Typography>
                                    }
                                </ButtonBase>
                                </Grid>
                                <Grid item>
                                <Link style={{ color: '006A4E' }} to='#' onClick={showLoginPage}>Back to Sign In</Link>
                                </Grid>
                            </Grid>
                                
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default AddNewPassword;