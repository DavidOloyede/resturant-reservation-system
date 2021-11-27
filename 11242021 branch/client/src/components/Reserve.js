import Axios from 'axios';
import React, {useState, useContext} from 'react';
import { LogInContext } from "../helper/Context";
import {useNavigate} from "react-router-dom"

const Reserve = () => {
    const navigate = useNavigate;

    const [emailReg, setEmailReg] = useState('')
    const [nameReg, setNameReg] = useState('')
    const [phoneReg, setPhoneReg] = useState('')
    const [dateReg, setDateReg] = useState('')
    const [timeReg, setTimeReg] = useState('')
    const [guestReg, setGuestReg] = useState('')
    const{loggedIn, setLogIn}=useContext(LogInContext)

    const postReservation=()=>{
        Axios.post('http://localhost:3001/reservation', {
        email:emailReg,
        name:nameReg,
        phone:phoneReg,
        date:dateReg,
        time:timeReg,
        guest:guestReg,
        }).then((response)=>{
        console.log(response);
        });
    };

    return (
        <div>
            {!loggedIn &&
                <div className="container">
                <h1> Welcome Guest User!</h1>
                <p> Please consider registering before reserving your table. There is so many many benefits that it doesnt make sense not to register!!!</p>
                <div className="container">
                    <h1> Please make a reservation below </h1>
                    <div className="column">
                        <label>Email:</label>
                        <input type="text" name="email" />
                        <label>Name:</label>
                        <input type="text" name="name"></input>
                        <label>Phone:</label>
                        <input type="tel" name="telephone"></input>
                        <label>Date:</label>
                        <input id="datefield" type="date" name="date" min="1899-01-01"></input>
                        <lable>Time:</lable>
                        <input type="time" name="time"></input>

                    </div>
                </div>
            </div>}

            {loggedIn && 
                <div className="container">
                    <h1> Welcome Registered User!</h1>
                    <h1> Please make a reservation below </h1>

                    <div className = "content">
                    <div className="column">
                        
                        <label>Email:</label>
                        <input type="email" name="registerEmail" onChange = {(e)=>{
                            setEmailReg(e.target.value)
                        }}/>

                        <label>Name:</label>
                        <input type="text" name="name" onChange = {(e)=>{
                            setNameReg(e.target.value)
                        }}/>
                        

                        <label>Phone:</label>
                        <input type="tel" name="telephone" onChange = {(e)=>{
                            setPhoneReg(e.target.value)
                        }}></input>

                        
                        <label>Date:</label>
                        <input id="datefield" type="date" name="date" min="1899-01-01" onChange = {(e)=>{
                            setDateReg(e.target.value)
                        }}></input>

                        <lable>Time:</lable>
                        <input type="time" name="time" onChange = {(e)=>{
                            setTimeReg(e.target.value)
                        }}></input>

                        <lable>Number of Guests:</lable>
                        <input type="number" name="guest" onChange = {(e)=>{
                            setGuestReg(e.target.value)
                        }}></input>

                        <button onClick={postReservation}>Submit</button>

                    </div>
                    </div>
                </div>}
            </div>
    )
}
                    

export default Reserve
