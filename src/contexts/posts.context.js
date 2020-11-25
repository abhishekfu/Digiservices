import React, { createContext, useContext,useEffect,useReducer } from 'react';
import {UserContext} from './user.context';
import reducer from '../reducers/posts.reducer';
import { apiCall } from '../services/api';
import config from '../config/config';
import S3FileUpload from "react-s3";
import { v4 as uuidv4 } from 'uuid';
export const PostContext = createContext();

export function PostProvider({ children }) {
    const initialState = { saleRealEstate: [],rentRealEstate:[],pendingPosts:[] };
    const [Posts, dispatch] = useReducer(reducer, initialState);
    const {user} = useContext(UserContext);
    const images = [];
    useEffect(()=>{
        apiCall('get', '/dev/service')
                .then(([...posts]) => {
                    
                    dispatch({ type: 'GET_POST',posts:posts });
                    
                }).catch((err) => {
                    console.log(err.message);
                    
                })
    },[])
   
    const getPost=()=>{
        return new Promise((resolve, reject) => {
            return  apiCall('get', '/dev/service')
            .then(([...posts]) => {
                dispatch({ type: 'GET_POST',posts:posts });
                
            }).catch((err) => {
                console.log(err.message);
                
            })
        })
    }
    
    const uploadImage = (file) => {
        return new Promise((resolve, reject) => {
            return S3FileUpload.uploadFile(file, config).then((data) => {
                images.push(data.location);
                resolve();

            }).catch((err) => {
                console.log(err);
                reject();
            });
        })
    }
    const approvePost = (serviceid,servicetype,status) => {
        return new Promise((resolve, reject) => {
            return  apiCall('patch', `/dev/admin/aprove/${serviceid}?servicetype=${servicetype}&approvalstatus=${status}`)
            .then(() => {
                resolve();
                
            }).catch((err) => {
                console.log(err);
                reject();
            })
        })
        
    }
    const deletePost = (serviceid,servicetype) => {
        return new Promise((resolve, reject) => {
            return  apiCall('delete', `/dev/service/${serviceid}?servicetype=${servicetype}`)
            .then(() => {
                resolve();
                
            }).catch((err) => {
                console.log(err);
                reject();
            })
        })
        
    }


    const approveAllPost = (posts,servicetype,status) => {
        let promises;
        if(status==='ACTIVE'){
            promises = posts.map(post => {
                return approvePost(post.id,servicetype,status)
            });
        }
        else if(status==='REJECTED'){
            promises = posts.map(post => {
                return deletePost(post.id,servicetype)
            });
        }
        
        return Promise.all(promises)
   
}
    

    const createPost = ({files,dropdownCategory,...postData}) => {
        const promises = files.map(file => {
            return uploadImage(file)
        });
        return Promise.all(promises).then(() => {
            return new Promise((resolve, reject) => {
                const data = {...postData,
                    serviceid:uuidv4(),
                    contact:user.phone_number,
                    postedby:user.profile_name,
                    dateposted:new Date().toLocaleDateString(),
                    userid:user.username,
                    images,
                    category:dropdownCategory,
                    approvalstatus:'PENDING'
                }
                return apiCall('post', '/dev/service',data)
                    .then(() => {
                        resolve();
                    }).catch((err) => {
                        console.log(err.message);
                        reject();
                    })
    
            })
        })
    }



    return (
        <PostContext.Provider value={{ Posts,getPost, createPost,dispatch,approveAllPost }}>
            {children}
        </PostContext.Provider>
    )

}
