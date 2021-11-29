import React, { useState, useEffect, Component } from "react"; 
import './App.css';
import Header from "./components/Header";
import Profile from "./components/profile";
import Axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import {LogInContext} from './helper/Context'
import Reserve from "./components/Reserve";

function App() {
  /*
  const[movieName, setMovieName] = useState("");
  const[review, setReview] = useState("");
  */

  /*
  const [usernameReg, setUsernameReg]= useState('')
  const [passwordReg, setPasswordReg]= useState('')

  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')

  const [loginStatus, setLogInStatus]=useState('')

  const register=()=>{
    Axios.post('http://localhost:3001/register', {
      email:usernameReg, 
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
        setLogInStatus(response.data[0].email)
      }

      console.log(response.data);
    });
  };
  */
  const [loggedIn, setLogIn]=useState(false)
    return(
      /*
      <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie name:</label>
        <input type="text" name="movieName" onChange = {(e)=>{
          setMovieName(e.target.value)
        }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange = {(e)=>{
          setReview(e.target.value)
        }}/>

        <button>Submit</button>
      </div>

      </div>*/

      <div className="App">

        <div className="navbar">
          <a className="logo" href="/">Restaurant<span>App</span></a>        
        </div>
        <LogInContext.Provider value={{loggedIn, setLogIn}}>
          <Router>
            <Routes> 
              <Route path="/" element={<Header/>} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/reserve" element={<Reserve/>}/>
            </Routes>
          </Router>
        </LogInContext.Provider>
      </div>
    );
}

export default App;
