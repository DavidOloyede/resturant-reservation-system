import Axios from 'axios';
import React, {useState, useContext, Component} from 'react';
import { LogInContext } from "../helper/Context";
import {useNavigate} from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

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

    const [selectedDate, setSelectedDate] = useState(null)


    return (
        <div>
            {!loggedIn &&
                <div className="container">
                <h1> Welcome Guest User!</h1>
                <p> Please consider registering before reserving your table. There is so many many benefits that it doesnt make sense not to register!!!</p>
                <div className="container">
                    <h1> Please make a reservation below </h1>
                    <div className = "content">
                        <div className="form_v2">
                        
                            <label>Email:</label>
                            <input type="email" name="registerEmail" onChange = {(e)=>{
                                setEmailReg(e.target.value)
                            }}/>

                            <label>Name:</label>
                            <input type="text" name="name" onChange = {(e)=>{
                                setNameReg(e.target.value)
                            }}/>               

                            <label>Phone (format: ###-###-####):</label>
                            <input type="tel" name="telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange = {(e)=>{
                                setPhoneReg(e.target.value)
                            }}></input>

                            <label>Date:</label>
                            <input id="datefield" type="date" name="date" min="2021-12-01" onChange = {(e)=>{
                                setDateReg(e.target.value)
                            }}></input>

                            <label>Time:</label>
                            <input type="time" name="time" onChange = {(e)=>{
                                setTimeReg(e.target.value)
                            }}></input>

                            <label>Number of Guests:</label>
                            <input type="number" name="guest" onChange = {(e)=>{
                                setGuestReg(e.target.value)
                            }}></input>

                            <button onClick={postReservation}>Submit</button>

                            {/*
                            I CANT FIGURE OUT HOW TO USE DATE PICKER AND SEND THE INFORMATION WITH OUR CURRENT FORMAT.

                            <label>Date:</label>
                                <DatePicker id="datefield"
                                    selected = {selectedDate} 
                                    onChange = {date => setSelectedDate(date)}
                                    minDate = {new Date()}
                                    dateFormat = 'MM-dd-yyyy'
                                />
                            */}

                        </div>
                    </div>
                </div>
            </div>}

            {loggedIn && 
                <div className="container">
                    <h1> Welcome Registered User!</h1>
                    <h1> Please make a reservation below </h1>

                    <div className = "content">
                        <div className="form_v2">
                        
                            <label>Email:</label>
                            <input type="email" name="registerEmail" onChange = {(e)=>{
                                setEmailReg(e.target.value)
                            }}/>

                            <label>Name:</label>
                            <input type="text" name="name" onChange = {(e)=>{
                                setNameReg(e.target.value)
                            }}/>               

                            <label>Phone (format: ###-###-####):</label>
                            <input type="tel" name="telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange = {(e)=>{
                                setPhoneReg(e.target.value)
                            }}></input>

                            <label>Date:</label>
                            <input id="datefield" type="date" name="date" min="2021-12-01" onChange = {(e)=>{
                                setDateReg(e.target.value)
                            }}></input>

                            <label>Time:</label>
                            <input type="time" name="time" onChange = {(e)=>{
                                setTimeReg(e.target.value)
                            }}></input>

                            <label>Number of Guests:</label>
                            <input type="number" name="guest" onChange = {(e)=>{
                                setGuestReg(e.target.value)
                            }}></input>

                            <button onClick={postReservation}>Submit</button>

                            {/*
                            I CANT FIGURE OUT HOW TO USE DATE PICKER AND SEND THE INFORMATION WITH OUR CURRENT FORMAT.

                            <label>Date:</label>
                                <DatePicker id="datefield"
                                    selected = {selectedDate} 
                                    onChange = {date => setSelectedDate(date)}
                                    minDate = {new Date()}
                                    dateFormat = 'MM-dd-yyyy'
                                />
                            */}

                        </div>
                    </div>
                </div>}
            </div>
    )
}
                    

export default Reserve
