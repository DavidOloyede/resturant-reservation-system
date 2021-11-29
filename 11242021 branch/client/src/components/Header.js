import React, { useState, useContext } from "react";
import Axios from 'axios';
import { LogInContext } from "../helper/Context";
import {useNavigate} from "react-router-dom"
export const Header = () => {
    const navigate= useNavigate();
    const [usernameReg, setUsernameReg]= useState('')
    const [passwordReg, setPasswordReg]= useState('')
    const [firstNameReg, setFirstNameReg]= useState('')
    const [lastNameReg, setLastNameReg]= useState('')

    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')

    const [loginStatus, setLogInStatus]=useState('')
    const{loggedIn, setLogIn}=useContext(LogInContext)

    const notRegisteredReservation=()=>{
        navigate("/reserve")
    }

    const register=()=>{
        Axios.post('http://localhost:3001/register', {
        email:usernameReg,
        firstName:firstNameReg,
        lastName:lastNameReg, 
        password:passwordReg,
        }).then((response)=>{
        console.log(response);
        });
    };

    const login=()=>{
        Axios.post('http://localhost:3001/login', {
        email:username, 
        password:password,
        }).then((response)=>{
        if(response.data.message){
            setLogInStatus(response.data.message)
        }else{
            //setLogInStatus(response.data[0].email)
            setLogIn(true)
            navigate("/profile")
        }

        console.log(response.data);
        });
    };
    return (
        <div className="container">
            <div className="container">
                <h1> Welcome Guests</h1>
                <p> At our establishment we pride ourselves in providing the best experience possible. That includes anything from amazing food to great service. Just know that
                    when you visit us, we will take care of you and make sure you leave with both a smile on your face and a happy stomach. So dont hesitate, create an account with us and 
                    reserve a table for your next visit!</p>
            </div>

            <div className="container">
                <h1> Sign up or Log in</h1>
                <p> Make the easiest decision of your life and register with us. You can make reservations a lot faster by storing some informaiton. Not only that but you can
                    receive perks from each visit that you give us. Make your life easier and save money simply by registering. 
                </p>
            </div>


            <div className="content"> 
          <div className="column"> 
            <h2 style={{textAlign:'center'}}> Sign up</h2>
            <div className="form">
              <label>Email</label>
              <input type="email" name="registerEmail" onChange = {(e)=>{
                setUsernameReg(e.target.value)
              }}/>

              <label>First Name</label>
              <input type="text" name="firstName" onChange = {(e)=>{
                setFirstNameReg(e.target.value)
              }}/>
              
              <label>Last Name</label>
              <input type="text" name="lastName" onChange = {(e)=>{
                setLastNameReg(e.target.value)
              }}/>

              <label>Password:</label>
              <input type="text" name="registerPassword" onChange = {(e)=>{
                setPasswordReg(e.target.value)
              }}/>

              <button onClick={register}>Submit</button>
            </div>
          
          </div>

          <div className="column"> 
            <h2 style={{textAlign:'center'}}> Log In</h2>
            <div className="form">
              <label>Email:</label>
              <input type="text" name="email" onChange = {(e)=>{
                setUsername(e.target.value)
              }}/>
              <label>Password:</label>
              <input type="text" name="review" onChange = {(e)=>{
                setPassword(e.target.value)
              }}/>

              <button onClick={login}>Submit</button>
            </div>
              <h1>{loginStatus} </h1>
          </div>
        </div>

        <div className="container"> <button style={{background:"none", border:"none", padding:"0", textDecoration:"underline", color:"black", cursor:"pointer",
                                                    }} onClick={notRegisteredReservation}>continue as guest</button></div>
        </div>
    )
}

export default Header