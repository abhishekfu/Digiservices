import React, { useContext,useEffect, useState } from 'react';
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom';
import Homepage from './Homepage';
import {DrawerContext} from '../contexts/drawer.context';
import {CategoryContext} from '../contexts/category.context'
import {UserContext} from '../contexts/user.context'
import Navbar from '../components/Navbar';
import BuySellLandingPage from './BuySellLandingPage';
import RentLandingPage from './RentLandingPage';
import Sidebar from '../common/Sidebar';
import Signup from '../pages/Signup';
import PostServicePage from '../pages/postAd/BasePage';
import LoadingPage from '../common/LoadingPage';
import SuccessPage from '../common/SuccessPage';
import {admin} from '../constants/utilities';
import AdminBasepage from './admin/AdminBasepage';

export default function Main() {
    
    const {showDrawer} = useContext(DrawerContext);
    const {user,setUser} = useContext(UserContext);
    const [loading,setLoading]= useState(true);
    const {success}= useContext(CategoryContext);
  
    useEffect(()=>{
        setUser().then(()=>setLoading(false)).catch((e)=>console.log(e));
        

    },[])
    if(loading){
        return <LoadingPage/>
    }
    return (
        <Router>
        {!admin.includes(user.email) && <Navbar/>}
            <Switch>
                {/* <Route exact path='/' component={Homepage}/> */}
                <Route exact path='/' render={()=>admin.includes(user.email)?<AdminBasepage/>:<Homepage/>}/>
                <Route exact path='/real_estates/sale' render={()=>!admin.includes(user.email)?<BuySellLandingPage/>:<Redirect to='/'/>}/> 
                <Route exact path='/real_estates/rent' render={()=>!admin.includes(user.email)?<RentLandingPage/>:<Redirect to='/'/>}/> 
                <Route path='/post' render={()=>(user.email!=='')&&!admin.includes(user.email)?<PostServicePage/>:<Redirect to='/'/>}/> 
                <Route path='/signup' render={()=>user.email===''?<Signup/>:<Redirect to='/'/>}/> 
                <Route path='/success' render={()=>success?<SuccessPage/>:<Redirect to='/'/>}/> 
            </Switch>
            {showDrawer&&<Sidebar/>}
        </Router>
    )
}
