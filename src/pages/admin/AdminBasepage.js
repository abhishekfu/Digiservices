import React, { useContext, useState,useEffect } from 'react'
import { PostContext } from '../../contexts/posts.context';
import { UserContext } from '../../contexts/user.context';
import {Fab} from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BasePage from './Basepage';
import LoadingPage from '../../common/LoadingPage';
function AdminBasepage({history}) {
    const { Posts,getPost } = useContext(PostContext);
    const {dispatch} = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
        getPost();
    },[])
    return (
        <>
            {Posts.pendingPosts.length === 0 ? (
                <>
                <LoadingPage type='leisure'/>
                <h1 style={{marginLeft:'40%'}}>No pending posts in queue</h1>
                </>
            ) : (
                <BasePage posts={Posts.pendingPosts} getPost={getPost}/>
                )}
                <Fab
				style={{
					margin: 0,
					top: 'auto',
					right: 20,
					bottom: 20,
					left: 'auto',
					position: 'fixed'
				}}
				color="inherit"
				aria-label="add"
				onClick={() => {
                                Auth.signOut().then(() => {
                                    history.push('/');
                                    dispatch({ type: 'REMOVE_USER' });
                                    enqueueSnackbar('Logged out successfully.', { variant: 'success' });
                                })

                            }}
			>
				<ExitToAppIcon />
			</Fab>
        </>
    )
}

export default  withRouter(AdminBasepage);