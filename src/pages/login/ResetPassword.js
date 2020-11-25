import React, { useState } from 'react'
import AddNewPassword from './AddNewPassword';
import { Grid, Typography, FormControl, TextField, ButtonBase,CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../../components/Link';
import { useSnackbar } from 'notistack';
import { Fade } from 'react-reveal'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Auth } from 'aws-amplify';
import {Slide} from 'react-reveal';
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
export default function ResetPassword({ showLoginPage }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [addNewPassword,setAddNewPassword]=useState(false); 
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        Auth.forgotPassword(email)
            .then((response) => {
                enqueueSnackbar('Security code sent to email.', { variant: 'info' });
                setAddNewPassword(true);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }

    if(addNewPassword){
        return (<Slide left><AddNewPassword email={email} showLoginPage={showLoginPage}/></Slide>)
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
                    <Typography color='secondary' className={classes.title} align='center' variant="h6">RESET PASSWORD</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.form} container direction='column'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid item className={classes.input} xs={12}>
                                <FormControl fullWidth>
                                    <TextField value={email} type='email' autoFocus required label="Email" onChange={(e) => setEmail(e.target.value)} />
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
