import React, { useState ,useContext} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, FormControl, TextField, ButtonBase, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Fade} from 'react-reveal'
import { Auth } from 'aws-amplify';
import {UserContext} from '../../contexts/user.context';
import {withRouter} from 'react-router-dom';
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


function Login({ title, buttonText ,history,showResetPasswordPage,showSignupPage}) {
    const { enqueueSnackbar } = useSnackbar();
    const {dispatch} = useContext(UserContext);
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleEmailChange = (e) => {
        setState(prevState => {
            return { ...prevState, email: e.target.value }
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
        Auth.signIn(state.email, state.password)
            .then((response) => {
                enqueueSnackbar('Successfully logged in.',{variant:'success'});
                dispatch({type:'SET_USER',email:response.attributes.email,username:response.username,phone_number:response.attributes.phone_number,profile_name:response.attributes['custom:profile_name']});
                setLoading(false);
                history.push('/');
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
                    <Typography color='secondary' className={classes.title} align='center' variant="h6">{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.form} container direction='column'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.email} type='email' autoFocus required label="Email Address" onChange={(e) => handleEmailChange(e)} />
                                </FormControl>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.password} required type='password' label="Password" onChange={(e) => handlePasswordChange(e)} />
                                    <Typography style={{paddingTop:"5px"}} variant='caption' color='textSecondary'>
                                        Forgot Your Password? 
                                        <Link style={{color:'006A4E'}} to='#' onClick={showResetPasswordPage}>{' '}Reset Password</Link>
                                    </Typography>
                                </FormControl>
                            </Grid>
                            <Grid style={{ marginTop: '20px' }} item >
                            <Grid container direction='row-reverse' justify='space-between' alignItems='center'>
                                    <Grid item>
                                    <ButtonBase disabled={loading} type='submit'>
                                    {loading ? <CircularProgress color="inherit" /> :
                                        <Typography align='right' color='secondary' className={classes.btn} variant='button'>{buttonText}</Typography>
                                    }
                                </ButtonBase>
                                    </Grid>
                                    <Grid item>
                                    <Typography variant='caption' color='textSecondary'>
                                        No Account? 
                                        <Link style={{color:'006A4E'}} to='#' onClick={showSignupPage}>{' '}Create Account</Link>
                                    </Typography>
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


Login.defaultProps = {
    title: 'LOG IN',
    buttonText: 'Login'
}

export default withRouter(Login);