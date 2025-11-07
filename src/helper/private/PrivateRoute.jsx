import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/Context';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({children}) => {
    const {userdata} = useContext(GlobalContext)

    useEffect(()=>{
        if (!userdata.loggedEmail){ 
            toast.error("We have to login first")
       }
    }, [])
    
    if(!userdata.loggedEmail){
       return <Navigate to="/login" replace></Navigate>
    }
    else{
        return children
    }
    

 
}

export default PrivateRoute