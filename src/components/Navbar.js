import React, { useContext } from 'react'
import { Grid, Typography, Button, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DrawerContext } from '../contexts/drawer.context';
import Link from './Link';
import { admin } from '../constants/utilities'
import { UserContext } from '../contexts/user.context';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "#006A4E"
    },
    text: {
        marginLeft: theme.spacing(1),
        color: '#fff'
    },
    textUnderline: {
        marginLeft: theme.spacing(1),
        color: '#fff',
        textDecoration: 'underline'
    },
    item: {
        paddingRight: "12px"
    },
    disabled: {
        marginLeft: theme.spacing(1),
        color: '#d3d3d3',
        cursor: 'not-allowed'
    }
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);



export default function Navbar() {
    const classes = useStyles();
    const { toggleShowDrawer } = useContext(DrawerContext);


    const { user } = useContext(UserContext);

    return (
        <div>
            <Grid className={classes.root} container justify='space-between' alignItems='center'>
                <Grid item xs={6}>
                    <Grid container alignItems='center'>
                        {!admin.includes(user.email) && (
                            <MenuIcon style={{ color: '#fff' }} fontSize='large' onClick={toggleShowDrawer} />
                        )}

                        <Link to='/'>
                            <Typography className={classes.text} variant='h6'>DigiServices</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify='flex-end' alignItems='center'>
                     {!admin.includes(user.email) && (
                        <Grid item className={classes.item}>
                            {user.email === '' ? (
                                <LightTooltip title="Login / signup to post your ad.">
                                    <Button variant='text' className={classes.disabled}>POST YOUR AD</Button>
                                </LightTooltip>

                            ) : (
                                    <Link className={classes.text} to='/post'>POST YOUR AD</Link>
                                )}
                        </Grid>
                     )}
                       
                        <Grid item className={classes.item}>
                            {user.email ? (
                                <Typography className={classes.text} variant='body1' color="secondary">Logged in as {user.profile_name}</Typography>
                            )
                                :

                                (
                                    <Link to='/signup'>
                                        <Typography className={classes.text} variant='inherit' color="secondary">Login / Sign Up</Typography>
                                    </Link>
                                )}

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
