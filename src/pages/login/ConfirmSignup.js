import React, { useState,useContext } from 'react'
import { Grid, Typography, FormControl, TextField, ButtonBase,CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../../components/Link';
import {UserContext} from '../../contexts/user.context';
import { useSnackbar } from 'notistack';
import { Fade } from 'react-reveal'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #006A4E',
        maxWidth: '40vw',
        marginTop: theme.spacing(10),
        boxShadow: '10px 10px 19px 0px rgba(11,102,22,1)'
    },
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    form: {
        padding: theme.spacing(4)
    },
    title: {
        padding: theme.spacing(1),
        fontWeight: 'bold',
        backgroundColor: '#006A4E'
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
}))
function ConfirmSignup({ history,email,username,password,showLoginPage}) {
    const classes = useStyles();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [code,setCode] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const {dispatch} = useContext(UserContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        Auth.confirmSignUp(email,code)
            .then((res) => {
                Auth.signIn(email, password)
                    .then((response) => {
                        enqueueSnackbar('Successflly created an account.', { variant: 'success' });
                        dispatch({type:'SET_USER',email:response.attributes.email,username:response.username,phone_number:response.attributes.phone_number,profile_name:response.attributes['custom:profile_name']});
                        setLoading(false);
                        history.push('/');
                    })
                    .catch((error) => {
                        setError(error.message);
                        setLoading(false);
                    })
               
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }
    const resendConfirmationCode = (e)=>{
        e.preventDefault();
        setError('');
        setCode('');
        setLoading(true);
        Auth.resendSignUp(email)
            .then((response) => {
                enqueueSnackbar('Verification code resend to email.', { variant: 'info' });
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }


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
                    <Typography color='secondary' className={classes.title} align='center' variant="h6">CONFIRM SIGN UP</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.form} container direction='column'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={username} type='text' disabled required label="Username" />
                                </FormControl>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={code} type='number' autoFocus required label="Confirmation Code" onChange={(e)=>setCode(e.target.value)}/>
                                    <Typography style={{paddingTop:"5px"}} variant='caption' color='textSecondary'>
                                        Lost Your Code? 
                                        <Link style={{color:'006A4E'}} to='#' onClick={resendConfirmationCode}>{' '}Resend Code</Link>
                                    </Typography>
                                </FormControl>
                            </Grid>
                            <Grid style={{ marginTop: '20px' }} item >
                                <Grid container direction='row-reverse' justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <ButtonBase disabled={loading} type='submit'>
                                        {loading ? <CircularProgress color="inherit" /> :
                                            <Typography align='right' color='secondary' className={classes.btn} variant='button'>CONFIRM</Typography>
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
export default withRouter(ConfirmSignup);