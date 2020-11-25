import React, { useState,useContext } from 'react';
import { Grid, Checkbox, FormControlLabel ,Button,CircularProgress} from '@material-ui/core'
import SideItems from './SideItem';
import { makeStyles } from '@material-ui/core/styles';
import DetailsPage from './DetailsPage';
import {PostContext} from '../../contexts/posts.context';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   
    root: {
        height: '100vh',
        position:'relative',
        top:'8vh'
    },
    item: {
        backgroundColor: '#F5F5F5',
    },
    container: {
        padding: theme.spacing(3)
    },
    form: {
        backgroundColor: '#006A4E',
        padding: theme.spacing(1),
        position:'fixed',
        zIndex:"999"
    },
    firstCheckBox: {
        marginLeft: theme.spacing(5)
    }
}));
function Basepage({ posts,history,getPost }) {
   
    const classes = useStyles();
   const {approveAllPost}= useContext(PostContext);
   const [loading,setLoading]=useState(false);
    const [current, setCurrent] = useState(posts[0].serviceid);
    const [selectCheckBox,setSelectCheckBox] = useState(false);
    const [deselectCheckBox,setDeselectCheckBox] = useState(false);
    let arr=[]
    posts.map(post=>arr.push({id:post.serviceid,flag:false}));
    
    const [arrayCheckBox,setArrayCheckBox]= useState(arr);
    const flag = arrayCheckBox.every(arr=>arr.flag===false);
    const handleCheck =(serviceid,check)=>{
        const newArr = arrayCheckBox.map((arr)=>{
            if(arr.id===serviceid){
                return {...arr,flag:check}
            }
            return arr;
        })
        setArrayCheckBox(newArr);
    
    }
   
    if(posts.length===0){return <div>No posts to display in base page</div>}
    return (
        <>
            <Grid container className={classes.form}>
                <Grid item className={classes.firstCheckBox}>
                    <FormControlLabel
                     style={{color:'#fff'}}
                        control={
                            <Checkbox
                            style={{color:'#fff'}}
                                checked={selectCheckBox}
                                onChange={() => {
                                    if(selectCheckBox===false){
                                        const newArr = arrayCheckBox.map(arr=>{
                                            return {...arr,flag:true}
                                        });
                                        setArrayCheckBox(newArr);
                                        
                                  
                                    }
                                    setSelectCheckBox(prevState=>!prevState)
                                    
                                }}
                                color="primary"
                            />
                        }
                        label="Select All"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                     style={{color:'#fff'}}
                        control={
                            <Checkbox
                            style={{color:'#fff'}}
                                checked={deselectCheckBox}
                                onChange={() => {
                                    if(deselectCheckBox===false){
                                    const newArr = arrayCheckBox.map(arr=>{
                                            return {...arr,flag:false}
                                        });
                                        setArrayCheckBox(newArr);
                                    }
                                 
                                    setDeselectCheckBox(prevState=>!prevState);
                                    
                                }}
                                color="primary"
                            />
                        }
                        label="Deselect All"
                    />
                </Grid>
                <Grid item className={classes.firstCheckBox} >
                {loading?(<CircularProgress color='secondary'/>):(
                    <Button  variant="contained" disableElevation color="secondary" disabled={flag} 
                    onClick={()=>{
                        setLoading(true)
                        const arr = arrayCheckBox.filter(i=>i.flag===true)
                        approveAllPost(arr,'REAL_ESTATE','ACTIVE').then(()=>{
                            setLoading(false);
                            getPost();
                           // history.push('/');
                        }).catch(e=> {
                            setLoading(false);
                            getPost();
                             //history.push('/');
                            });
                    }}>
                        Approve All
                    </Button>
                )}
                    
                </Grid>
                <Grid item className={classes.firstCheckBox} >
                {loading?(<CircularProgress color='secondary'/>):(
                    <Button variant="contained" disableElevation color="secondary" disabled={flag}
                    onClick={()=>{
                        setLoading(true);
                        const arr = arrayCheckBox.filter(i=>i.flag===true);
                        approveAllPost(arr,'REAL_ESTATE','REJECTED').then(()=>{
                            setLoading(false);
                            getPost();
                            
                        }).catch(e=> {
                            setLoading(false); 
                            getPost();
                            
                            })
                    }}>
                        Reject All
                    </Button>
                )}
                </Grid>

            </Grid>
            <Grid container className={classes.root} >
            
                <Grid item style={{height:'100%',overflowY:'scroll',width:'100%'}} className={classes.item} xs={3}>
                
                    <Grid container  className={classes.container} direction='column'>
                        {posts.map(post => {
                            const arr = arrayCheckBox.filter(i=>i.id===post.serviceid);
                            if(arr.length===0){return <div/>}
                            return <SideItems key={post.serviceid} post={post} current={current} setCurrent={setCurrent} checked={arr[0].flag} handleCheck={handleCheck}/>
                        })}
                    </Grid>
                    
                </Grid>
               
               
                <Grid item xs={9}>
                
                    <DetailsPage posts={posts} current={current} />
                   
                </Grid>
                
            </Grid>
        </>
    )
}
export default withRouter(Basepage);