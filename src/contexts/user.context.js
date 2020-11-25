import React,{createContext,useReducer} from 'react';
import reducer from '../reducers/user.reducer';
import getCurrentUser from '../services/helper';
export const UserContext = createContext();

export function UserProvider({children}){
    const initialState = {
        email:'',
        username:'',
        profile_name:'',
        phone_number:''
    }
   

    const setUser=()=>{
       
        return new Promise((resolve,reject)=>{
            return getCurrentUser()
            .then(response=>{
                
                dispatch({type:'SET_USER',email:response.attributes.email,username:response.username,phone_number:response.attributes.phone_number,profile_name:response.attributes['custom:profile_name']});
                resolve();
            })
            .catch(error=>{
                console.log(error)
                resolve();
            })
        })
    }

    const [user,dispatch]=useReducer(reducer,initialState);
    
    
    return (
        <UserContext.Provider value={{user,setUser,dispatch}}>{children}</UserContext.Provider>
    )
}
