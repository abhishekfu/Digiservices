import React from 'react'
import {Paper,Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Banner from '../components/Banner';
import data from '../constants/utilities'
import Utility from '../components/Utility';
const useStyles = makeStyles((theme) => ({
    
    paper:{
        position:"relative",
        top:"-12vh",
        left:'40vh',
        width:'60vw',
    }
}));



export default function Homepage() {
    const classes = useStyles();
    return (
        <div>
            <Banner/>
            <Paper className={classes.paper}>
                <Grid container>
                    {data.map((item)=>{
                        return item.categories.map((category,k)=>{
                            const {src,text,link} = category;
                            return (<Utility key={text} src={src} text={text} link={link}/>)
                        })
                    })}
                </Grid>
            </Paper>       

        </div>
    )
}
