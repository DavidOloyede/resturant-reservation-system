import Axios from 'axios';
import React, {useState, useContext} from 'react';
import { LogInContext } from "../helper/Context";
import {useNavigate} from "react-router-dom";
import AvailableTimes from './AvailableTimes';

const Reserve = () => {
    const navigate = useNavigate;
    
    const [emailReg, setEmailReg] = useState('')
    const [nameReg, setNameReg] = useState('')
    const [phoneReg, setPhoneReg] = useState('')
    //const [dateReg, setDateReg] = useState('')
    //const [timeReg, setTimeReg] = useState('')
    //const [guestReg, setGuestReg] = useState('')
    const [billingaddReg, setBillingAddressReg] = useState('')
    const [mailingaddReg, setMailingAddressReg] = useState('')
    
   
    function sameAddress() {
        var billingaddy = document.getElementById('b_address');
        var mailingaddy = document.getElementById('m_address');
        mailingaddy.value = billingaddy.value  
    };
    

    
    const holidayChecker=()=>{
        Axios.post('http://localhost:3001/holidaychecker',{
            date:dateRegChoosen,
        }).then((response)=>{
            if(response.data.message){
                console.log(response);
                setHolidayStatus(response.data.message);
            }
        });
    };
    
    const [reservationStatus, setReservationStatus]=useState('')
    const [holidayStatus, setHolidayStatus]=useState('')
    const{loggedIn, setLogIn}=useContext(LogInContext)
    const [weHaveTimes, setWeHaveTimes]= useState(false)

    
    const postReservation=()=>{
        Axios.post('http://localhost:3001/reservation', {
        email:emailReg,
        name:nameReg,
        billingadd:billingaddReg,
        mailingadd:mailingaddReg,
        phone:phoneReg,
        date:dateRegChoosen,
        time:timeSelected,
        guest:numberofGuest,
        
        }).then((response)=>{
        if(response.data.message){
            setReservationStatus(response.data.message);
        }
        });
    };
    
    const [dateRegChoosen, setDate]= useState('')
    const [tableStatus, setTableStatus]= useState('')
    const [numberofGuest, setGuest]= useState('')
    const [allavailabletimes, setAvailableTimes]= useState(["8:00 AM", "10:00 AM","12:00 PM","2:00 PM","4:00 PM","6:00 PM","8:00 PM","10:00 PM","12:00 AM"])
    const times=["8:00 AM", "10:00 AM","12:00 PM","2:00 PM","4:00 PM","6:00 PM","8:00 PM","10:00 PM","12:00 AM"]
    const reservedTimes=[]
    let availableTimes=[]
    const findTimes=()=>{
        Axios.post('http://localhost:3001/reservationTimes', {
            Date:dateRegChoosen,
            Guests:numberofGuest,
            }).then((response)=>{
            if(response.data.message){
            }else{

                console.log(response.data);
                console.log(times);

                for(let x=0; x<response.data.length; x++){
                    if(!(reservedTimes.includes(response.data[x].time))){
                        reservedTimes.push(response.data[x].time)
                    }
                }
                availableTimes=times.filter(n => !reservedTimes.includes(n))
                setAvailableTimes(availableTimes)
                console.log(reservedTimes)
                console.log(availableTimes);
            }
    
            //console.log(response.data[0].time);
            });
            setWeHaveTimes(true) 
    };
    let timeOptions = allavailabletimes.map((aat)=>
                <option key={aat}>{aat}</option>
    );

    const [timeSelected, setTime]= useState('')
    const [reservationInfo, setReservationInfo]=useState(false)
    const [allavailableTables, setAvailableTables]=useState({
        "2":10,
        "4":10,
        "6":20,
        "8":20
    })
    const findTables=()=>{
        Axios.post('http://localhost:3001/findtables',{
            time:timeSelected,
            guestNum:numberofGuest,
            Date:dateRegChoosen,
        }).then((response)=>{
            if(response.data.message){
                //all tables are available at that time
                console.log(response.data)
                var tableSize="two"
                if(numberofGuest<=8){
                    for (var key in allavailableTables){
                        if(numberofGuest<=parseInt(key)){
                            tableSize=key
                            console.log(tableSize)
                            var table=("We will sit you in a table of size: " + tableSize)
                            setTableStatus(table)
                            break
                        }
                    }
                }else{
                   var numGuest= numberofGuest
                   var notEnough=true
                   tableSize=""
                    for (var key in allavailableTables){
                        numGuest=numGuest-parseInt(key)
                        tableSize+=","+key
                        if(numGuest<=0){
                            var table=("We will sit you in multiple tables of size: " + tableSize)
                            setTableStatus(table)
                            notEnough=false
                            break
                        }
                    }

                    if(notEnough){
                        var table=("We dont have enough tables at the moment")
                        setTableStatus(table)
                    }
                    


                }

            }else{
                console.log(response.data)
                for (var key in allavailableTables){
                    if(numberofGuest<=parseInt(key)){
                        tableSize=key
                        console.log(tableSize)
                        var table=("We will sit you in a table of size: " + tableSize)
                        setTableStatus(table)
                        break
                    }
                }
            }
        })
        setReservationInfo(true)
    }

    return (
        <div>
            {!loggedIn &&
                <div className="container">
                    <h1> Welcome Guest User!</h1>
                    <p> Please consider registering before reserving your table. There is so many many benefits that it doesnt make sense not to register!!!</p>
                </div>
            }

            {loggedIn && 
                <div className="container">
                    <h1> Welcome Registered User!</h1>
                </div>
            }
            <div className="content">

            <div className="column">

                <div className="form">
                    <label>Date:</label>
                    <input type="date" name="date" onChange = {(e)=>{
                        setDate(e.target.value)}}/>
                    <button onClick={holidayChecker}>Check daily fee</button>
                        <p>{holidayStatus} </p>
                    <label>Number of Guests:</label>
                        <input type="number" min="0" required onChange = {(e)=>{
                        setGuest(e.target.value)}}/>
                    <button onClick={findTimes}>Find Times</button>
                </div>

                {weHaveTimes &&
                    <div className="form">
                        <label>Time:</label>
                        <select onChange={(e)=>{
                            setTime(e.target.value)}}>
                            {timeOptions}
                        </select>
                        <button onClick={findTables}>Find Available Tables</button>
                        <p>{tableStatus} </p>
                    </div>
                }
                </div>
                {reservationInfo &&
                    <div className="column">
                        <div className="form">
                            <label>Email:</label>
                                <input type="email" name="registerEmail" onChange = {(e)=>{
                                    setEmailReg(e.target.value)
                                }}/>

                                <label>Name:</label>
                                <input type="text" name="naem" onChange = {(e)=>{
                                    setNameReg(e.target.value)
                                }}/>
                                
                                <label>Billing address:</label>
                                <input name="b_address" onChange = {(e)=>{
                                    setBillingAddressReg(e.target.value)
                                }}/>

                                {/* CURRENTLY THE BUTTON DOESNT WORK.
                            <label>Billing address same as Mailing?</label>
                            <input type="checkbox" onClick={sameAddress}/>*/}

                            <label>Mailing address:</label>
                            <input name="m_address" onChange = {(e)=>{
                                setMailingAddressReg(e.target.value)
                            }}/>

                            <label>Phone:</label>
                            <input type="tel" name="telephone" onChange = {(e)=>{
                                setPhoneReg(e.target.value)
                            }}></input>
                            <button onClick={postReservation}>Final Submit</button>
                            <h1>{reservationStatus} </h1>
                        </div>
                    </div>
                }
            </div>

        </div>
    )

}
                    

export default Reserve
