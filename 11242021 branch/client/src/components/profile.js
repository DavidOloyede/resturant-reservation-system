import React, { useState, useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { LogInContext } from "../helper/Context";
import {useNavigate} from "react-router-dom"
const Profile = () => {
    const navigate= useNavigate();
    const{loggedIn, setLogIn}=useContext(LogInContext)
    if(!loggedIn){
        return <Navigate to ="/"/>;
    }

    const reserveScreen=()=>{
        navigate("/reserve")
    }

    return (
        <div className="content">
            <p> Hello User</p>
            <p> To reserve click here </p> 
            <button onClick={reserveScreen}>Submit</button>
        </div>
    )
}

export default Profile
