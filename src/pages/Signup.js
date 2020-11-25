import React,{ useState} from 'react';
import Login from './login/Login'
import { Grid} from '@material-ui/core';
import {Slide} from 'react-reveal';
import ResetPassword from './login/ResetPassword';
import SignUP from './login/Signup';
export default function Signup() {
    const [loginPage,setLoginPage]= useState(true);
    const [resetPasswordPage,setResetPasswordPage]=useState(false);
    const [signupPage,setSignupPage] = useState(false);
    const showLoginPage = () =>{
        setLoginPage(true);
        setResetPasswordPage(false);
        setSignupPage(false)
    }

    const showResetPasswordPage = ()=>{
        setLoginPage(false);
        setResetPasswordPage(true);
        setSignupPage(false)
    }

    const showSignupPage = ()=>{
        setLoginPage(false);
        setResetPasswordPage(false);
        setSignupPage(true)
    }


    return (
        <Grid container justify='center' alignItems='center'>
            {loginPage && <Slide left><Login showResetPasswordPage={showResetPasswordPage} showSignupPage={showSignupPage}/></Slide>}
            {resetPasswordPage && <Slide left><ResetPassword showLoginPage={showLoginPage}/></Slide>}
            {signupPage && <Slide left><SignUP showLoginPage={showLoginPage}/></Slide>}
        </Grid>
    )
}
