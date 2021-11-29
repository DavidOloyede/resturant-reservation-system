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
    const [billingaddReg, setBillingAddressReg] = useState('')

    const [reservationStatus, setReservationStatus]=useState('')
    const{loggedIn, setLogIn}=useContext(LogInContext)

    const postReservation=()=>{
        Axios.post('http://localhost:3001/reservation', {
        email:emailReg,
        name:nameReg,
        phone:phoneReg,
        date:dateReg,
        time:timeReg,
        guest:guestReg,
        billingadd:billingaddReg,
        }).then((response)=>{
        if(response.data.message){
            setReservationStatus(response.data.message);
        }
        });
    };

    function sameAddress() {
        var billingaddy = document.getElementById('b_address');
        var mailingaddy = document.getElementById('m_address');
        mailingaddy.value = billingaddy.value  
    }

    return (
        <div>
            {!loggedIn &&
                <div className="container">
                <h1> Welcome Guest User!</h1>
                <p> Please consider registering before reserving your table. There is so many many benefits that it doesnt make sense not to register!!!</p>
                <div className="container">
                    <h1> Please make a reservation below: </h1>
                    <div className = "content">
                    <div className="form_2">
                        
                        <label>Email:</label>
                        <input type="email" name="registerEmail" onChange = {(e)=>{
                            setEmailReg(e.target.value)
                        }}/>

                        <label>Name:</label>
                        <input type="text" name="name" onChange = {(e)=>{
                            setNameReg(e.target.value)
                        }}/>
                        
                        <label>Billing address:</label>
                        <textarea name="b_address" onChange = {(e)=>{
                            setBillingAddressReg(e.target.value)
                        }}/>

                        {/* CURRENTLY THE BUTTON DOESNT WORK.*/}
                        <label>Billing address same as Mailing?</label>
                        <input type="checkbox" onclick={sameAddress}/>

                        <label>Mailing address:</label>
                        <textarea name="m_address" onChange = {(e)=>{
                            setBillingAddressReg(e.target.value)
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
                        <h1>{reservationStatus} </h1>

                    </div>
                    </div>
                </div>
            </div>}

            {loggedIn && 
                <div className="container">
                    <h1> Welcome Registered User!</h1>
                    <h1> Please make a reservation below: </h1>

                    <div className = "content">
                    <div className="form_2">
                        
                        <label>Email:</label>
                        <input type="email" name="registerEmail" onChange = {(e)=>{
                            setEmailReg(e.target.value)
                        }}/>

                        <label>Name:</label>
                        <input type="text" name="name" onChange = {(e)=>{
                            setNameReg(e.target.value)
                        }}/>
                        
                        <label>Billing address:</label>
                        <textarea name="b_address" onChange = {(e)=>{
                            setBillingAddressReg(e.target.value)
                        }}/>

                        {/* CURRENTLY THE BUTTON DOESNT WORK.*/}
                        <label>Billing address same as Mailing?</label>
                        <input type="checkbox" onclick={sameAddress}/>

                        <label>Mailing address:</label>
                        <textarea name="m_address" onChange = {(e)=>{
                            setBillingAddressReg(e.target.value)
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
                        <h1>{reservationStatus} </h1>

                    </div>
                    </div>
                    
                </div>}
            </div>
    )
}
                    

export default Reserve