import React, { useContext } from 'react';
import { Paper, Grid, Typography, Avatar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DrawerContext } from '../contexts/drawer.context';
import VerticalNavList from '../components/VerticalNavList';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Auth } from 'aws-amplify';
import {Bounce} from 'react-reveal';
import { UserContext } from '../contexts/user.context'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        minWidth: '20vw',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#5bc995',
        flex: 1,
        overflowY:"scroll",
        zIndex:"999"
    },
    root: {
        position: 'absolute',
        top: '-50vh',
        bottom: '0',
        width: '100%'
    },
    text: {
        marginTop: theme.spacing(3),
        color: '#fff'
    },
    avatar: {
        background: 'rgba(0,0,0,0.1)',
        padding: '2em 0.5em',
        textAlign: 'center'
    },
    img: {
        overflow: 'hidden',
        border: '4px solid #ffea92',
        boxShadow: '0 0 0 4px rgba(255,255,255,0.2)',
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    padded: {
        position:"absolute",
        top:theme.spacing(85) ,
        paddingLeft: theme.spacing(2)
    },
    vertical:{
        //position:"absolute",
        //top:theme.spacing(22) ,
        backgroundColor: '#5bc995', 
        flexGrow: '1'
    }
}));
const divStyle = {
    height: '100vh',
    minWidth: '80vw',
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)',
    position: 'relative',
    top: '-200vh',
    //left: '20vw',
    zIndex:'100'
}

function Sidebar({ history, location }) {
    const top = () => {
        switch (location.pathname) {
            case '/':
                return '-104vh';
            case '/signup':
                return '-103vh';
            case '/post':
                return '-114vh';
            default:
                return '-203vh';
        }
    }
    const style = { ...divStyle, top: top() };
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { user, dispatch } = useContext(UserContext);
    const { toggleShowDrawer } = useContext(DrawerContext);
    return (
        <>
            <Paper className={classes.container}>
                <Grid item>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item style={{ flexGrow: 1 }} xs={12}>
                            <Grid direction="column" container>
                                <Grid item style={{ backgroundColor: '#5bc995' }}>
                                    <Grid container direction='column' alignItems="center" className={classes.avatar}>
                                        <Avatar className={classes.img} src='https://images.macrumors.com/article-new/2019/04/guest-user-250x250.jpg' />
                                        <Typography className={classes.text} variant='body1'>{user.profile_name === '' ? 'Guest User' : user.profile_name}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.vertical}>
                                    <VerticalNavList />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Bounce bottom>
                    <Grid item>
                        {user.email ? (
                            <Link href="#" onClick={(e) => {
                                e.preventDefault();
                                Auth.signOut().then(() => {
                                    toggleShowDrawer();
                                    history.push('/');
                                    dispatch({ type: 'REMOVE_USER' });
                                    enqueueSnackbar('Logged out successfully.', { variant: 'success' });
                                })

                            }}>
                                <Typography className={classes.padded} variant="inherit" color='secondary'>Log out</Typography>
                            </Link>
                        ) : (
                                <Link href="/signup" >
                                    <Typography className={classes.padded} variant="inherit" color='secondary'>Log In / Sign Up</Typography>
                                </Link>
                            )}

                    </Grid>
                </Bounce>

            </Paper>
            <div onClick={toggleShowDrawer} style={style}></div>
            <div onClick={toggleShowDrawer} style={style}></div>

        </>
    )
}

export default withRouter(Sidebar);

