import React,{useState,useContext} from 'react';
import {Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import data from '../../constants/utilities';
import SideItems from './SideItems';
import BaseForm from './BaseForm';
import {CategoryContext} from '../../contexts/category.context';
import LoadingPage from '../../common/LoadingPage';
const useStyles = makeStyles((theme) => ({
    root: {
        height:'100vh'
    },
    item:{
        backgroundColor:'#F5F5F5'
    },
    text:{
        padding:theme.spacing(1),
        marginBottom:theme.spacing(1),
    }
}));
export default function BasePage() {
    const classes = useStyles();
    const [current,setCurrent] = useState(data[0].name);
    const {setCategory,loading} = useContext(CategoryContext);
    const changeCurrent = (text)=>{
        const arr = data.filter(i=>i.name===text);
        const item=arr[0];
        let a=[]
        item.categories.forEach(category=>{
            a.push({code:category.categorycode,
                name:category.categoryname})
            
        })
        setCategory({
            categories:a,
            servicetype:item.servicetype
        })
        setCurrent(text);
    }
   if(loading) return <LoadingPage/>
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.item} xs={2}>
                <Typography className={classes.text} variant='body1'>All Categories</Typography>
                <Grid container direction='column'>
                {data.map((item)=>{
                        return <SideItems key={item.name} text={item.name} current={current} changeCurrent={changeCurrent}/>
                })
                }
                </Grid>
            </Grid>
            <Grid item xs={10}>
              <BaseForm/>
            </Grid>
        </Grid>
    )
}
