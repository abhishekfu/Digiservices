import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Link from '../components/Link'
const useStyles = makeStyles((theme) => ({

    root: {
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15)
    },
    span: {
        padding: theme.spacing(5)
    },
    btn: {
        
    },
    title: {
        fontFamily: 'Arial'
    }
}));

export default function BannerItem(props) {
    const classes = useStyles();
    const { background,link } = props.item;
    return (
        <Link to={link}>
        <div style={{ background: background, backgroundSize: "cover"}}>
            <Grid container direction='column' justify='center' alignItems='center' className={classes.root}>
                <Grid item >
                    <Typography className={classes.title} color="secondary" variant='h2'>{props.item.name}</Typography>
                </Grid>
                <Grid item className={classes.span}>
                    <Typography color="secondary" variant='h5'>{props.item.description}</Typography>
                </Grid>
             
                <Grid item>
                    {props.button ? 
                    (<Button
                        disableElevation
                        size='large'
                        variant='contained'
                        color="secondary"
                        endIcon={<DoubleArrowIcon />}
                    >
                        Check it out!
                    </Button>):
                        (<div style={{height:"42px"}}/>)
                    

                    }
                </Grid>
                
            </Grid>
        </div>
        </Link>
    )
}

