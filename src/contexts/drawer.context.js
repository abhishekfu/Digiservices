import React,{createContext,useState} from 'react';

export const DrawerContext=createContext();

export function DrawerProvider({children}){
    const [showDrawer,setShowDrawer] = useState(false);
    const toggleShowDrawer = () =>{
        setShowDrawer(prevState=>!prevState)
    }
    return(
        <DrawerContext.Provider value={{showDrawer,toggleShowDrawer}}>{children}</DrawerContext.Provider>
    )
}
