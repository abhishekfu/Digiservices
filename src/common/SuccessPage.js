import React,{useContext} from 'react'
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Grid } from '@material-ui/core';
import {CategoryContext} from '../contexts/category.context'
import { withRouter } from 'react-router-dom';
import animationData1 from '../assets/animations/success.json';
const useStyles = makeStyles((theme) => ({
  
  btn: {
      textAlign: 'center',
      width: '100%',
      backgroundColor: '#006A4E',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      fontSize:"20px",
      '&:hover': {
          cursor: 'pointer'
      }
  }

}));
function SuccessPage({history}) {
  const classes = useStyles();
  const {setSuccess} = useContext(CategoryContext);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData:  animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Grid container direction="column" justify='center' alignItems='center'>
      <Grid item style={{ margin: "50px 0 0 0", width: "400px", height: "400px" }}>
        <Lottie options={defaultOptions}
          height={300}
          width={300}
        />
      </Grid>
       <Grid item>
        <Typography variant='h6'>Congratulations!! Your ad has been posted and will be reflected on the portal within 24 hrs</Typography>
      </Grid>
      
      <Grid item style={{ margin: "50px 0 0 0"}}>
        <Typography
          onClick={()=>{history.push('/');setSuccess(false);}}
         color='secondary' className={classes.btn} variant='button'>GO TO HOME PAGE</Typography>
        </Grid>
    
    </Grid>
  )
}


export default  withRouter(SuccessPage);