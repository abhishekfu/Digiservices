import React from 'react'
import {Grid, Paper,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Bounce} from 'react-reveal'
const useStyles = makeStyles((theme) => ({
    text:{
        padding:theme.spacing(1),
        fontWeight:'bold',
        color:'#006A4E'
    },
    root:{
        maxWidth:'15vw',
        marginBottom:theme.spacing(2),
        marginLeft:theme.spacing(2),
    },
    paper:{
       borderRightWidth:theme.spacing(1),
       borderRightStyle:"solid",
       borderRightColor:'#006A4E'
    }
}));
export default function SideItems({text,current,changeCurrent}) {
    const classes = useStyles();
    const style=()=>{
        if(current===text){
            return {
                borderRightWidth:"10px",
                borderRightColor:'#006A4E',
                borderRightStyle:"solid"
            }
        }
        return {
            backgroundColor:'#fff'
        }
    }
    return (
        <Bounce  bottom>
        <Grid  className={classes.root} item>
              <Paper style={style()}>
                <Typography  className={classes.text} variant='h6' onClick={()=>{changeCurrent(text)}}>{text}</Typography>
              </Paper>
        </Grid>
        </Bounce>
    )
}
