import React,{useState,createContext} from 'react'
import data from '../constants/utilities';
export const CategoryContext=createContext();

export function CategoryProvider({children}){
    const categories=[];
    data[0].categories.map((item)=>{
        categories.push({
            code:item.categorycode,
            name:item.categoryname
        })
    })
    const [category,setCategory]=useState({
        categories:categories,
        servicetype:data[0].servicetype
    })
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);
    return(
        <CategoryContext.Provider value={{category,setCategory,loading,setLoading,success,setSuccess}}>{children}</CategoryContext.Provider>
    )
}