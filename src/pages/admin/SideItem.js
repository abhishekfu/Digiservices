import React from 'react';
import { Grid, Paper,Checkbox, Typography,Chip, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(1),
        fontWeight: 'bold'
    },
    root: {
       minWidth:"15vw",
        padding:theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    paper: {
       
    }
}));
export default function SideItem({ post, current, setCurrent,checked,handleCheck }) {
    const style=()=>{
        if(current===post.serviceid){
            return {
                borderRightWidth:"5px",
                borderRightColor:'#006A4E',
                borderRightStyle:"solid"
            }
        }
        return {
            backgroundColor:'#fff'
        }
    }
    const classes = useStyles();

    return (
        <Grid container direction="row" alignItems='flex-start'>
        <Checkbox
        color="primary"
        checked={checked}
        value={post.serviceid}
        onChange={()=>{
            handleCheck(post.serviceid,!checked)
        }}
      />
      <ButtonBase disableRipple={true} onClick={()=>setCurrent(post.serviceid)}>
        <Paper className={classes.root} style={style()}>
        <Grid item >
            <Grid container direction="column">
                <Grid item>
                    <Typography align='left' className={classes.text}>{post.title.length<=20?post.title:post.title.slice(0,17).padEnd(20,'.')}</Typography>
                </Grid>
                <Grid item>
                    <Grid container justify='space-between'>
                        <Grid item>
                        <Chip label={post.servicetype} color="primary" size='small'/>
                        </Grid>
                        <Grid item>
                        <Chip label={post.category} color="default" size='small'/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
        </Paper>
        </ButtonBase>
        </Grid>
    )
}
