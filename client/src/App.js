import React, { useState, useEffect } from "react"; 
import './App.css';
import Axios from 'axios';

function App() {
  const[movieName, setMovieName] = useState("");
  const[review, setReview] = useState("");

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
    movieName: movieName, 
    movieReview: review,
    }).then(() =>{
      alert("successful insert");
    });
  };

    return <div className="App">
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

        <button onClick={submitReview}>Submit</button>
      </div>

    </div>;
}

function Reservation() {
  return<div className="Reservationform">
    <h1>THIS IS THE RESERVATION FORM</h1>
  </div>
}

export default App;
