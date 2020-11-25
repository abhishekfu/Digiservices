import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, FormControl, TextField, ButtonBase, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import MuiPhoneInput  from 'material-ui-phone-number';
import ConfirmSignup from './ConfirmSignup';
import Link from '../../components/Link';
import { useSnackbar } from 'notistack';
import { Fade, Slide } from 'react-reveal'
import { Auth } from 'aws-amplify';
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
export default function Signup({ showLoginPage }) {
    const classes = useStyles();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmSignup, setConfirmSignup] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState({
        username: '',
        password: '',
        email: '',
        phone_number: ''
    });
    const handleUsernameChange = (e) => {
        setState(prevState => {
            return { ...prevState, username: e.target.value }
        });
    }
    const handlePasswordChange = (e) => {
        setState(prevState => {
            return { ...prevState, password: e.target.value }
        });
    }
    const handleEmailChange = (e) => {
        setState(prevState => {
            return { ...prevState, email: e.target.value }
        });
    }
    const handlePhoneNumberChange = (value) => {
        setState(prevState => {
            return { ...prevState, phone_number: value }
        });
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        setError('');
        setLoading(true);
        Auth.signUp({
            username: state.email,
            password: state.password,
            attributes: {
                email: state.email,
                phone_number: state.phone_number.replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll(' ',''),
                'custom:profile_name': state.username
            }
        })
            .then((response) => {
                enqueueSnackbar('Security code sent to email.', { variant: 'info' });
                setConfirmSignup(true);
                setLoading(false);

            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }
   if(confirmSignup){
       return(<Slide left><ConfirmSignup email={state.email} username={state.username} password= {state.password} showLoginPage={showLoginPage}/></Slide>)
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
                    <Typography color='secondary' className={classes.title} align='center' variant="h6">CREATE NEW ACCOUNT</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.form} container direction='column'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.email} autoFocus type='email' required label="Email Address" onChange={(e) => handleEmailChange(e)} />
                                </FormControl>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.password} required type='password' label="Password" onChange={(e) => handlePasswordChange(e)} />
                                </FormControl>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={state.username} required type='text' label="Username" onChange={(e) => handleUsernameChange(e)} />
                                </FormControl>
                            </Grid>

                            <Grid item style={{marginTop:"30px",marginBottom:"30px"}} xs={12}>
                                <FormControl fullWidth>
                                    <MuiPhoneInput
                                        defaultCountry='ca'
                                        regions={'north-america'}
                                        onChange={handlePhoneNumberChange}
                                    />
                                    {/* <TextField value='+1' type='tel' disabled={true} label="Phone Number"/>
                                <TextField value={state.phone_number} type='tel' required  onChange={(e) => handlePhoneNumberChange(e)} /> */}
                                </FormControl>
                            </Grid>
                            <Grid style={{ marginTop: '20px' }} item >
                                <Grid container direction='row-reverse' justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <ButtonBase disabled={loading} type='submit'>
                                            {loading ? <CircularProgress color="inherit" /> :
                                                <Typography align='right' color='secondary' className={classes.btn} variant='button'>SEND CODE</Typography>
                                            }
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item>
                                    <Typography variant='caption' color='textSecondary'>
                                        Have an account? 
                                        <Link style={{color:'006A4E'}} to='#' onClick={showLoginPage}>{' '}Sign In</Link>
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
