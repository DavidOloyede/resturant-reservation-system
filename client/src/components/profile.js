import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogInContext } from "../helper/Context";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Profile = () => {
  const navigate = useNavigate();
  const { loggedIn, setLogIn } = useContext(LogInContext);
  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  const reserveScreen = () => {
    navigate("/reserve");
  };

  return (
    <div className="profile">
      <p> Hello User!</p>
      <p> To make a reservation click below </p>
      <button
        className="button"
        style={{ fontSize: "21px" }}
        onClick={reserveScreen}
      >
        <span>Reservations</span>
      </button>
    </div>
  );
};

export default Profile;
