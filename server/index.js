const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const e = require("express");

// const db = mysql.createPool({
//     host: 'localhost', //change necessary information
//     port: '3306',
//     user: 'root',
//     password: '123456789root',
//     database: 'cruddatabase',
// });

const db = mysql.createPool({
  host: "localhost", //change necessary information
  port: "3306",
  user: "root",
  password: "password",
  database: "4351project",
});

//The following bulk code was used to check if the connection to the server was working. Use as test if needed.

/*
app.get("/", (req, res) =>{
    const sqlInsert = "INSERT INTO users (email, password) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result) => {
        res.send("hello Jaime, bong bong");
    });
});
*/

app.use(express.json());
app.use(cors());
app.post("/register", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (email, firstName, lastName, password) VALUES (?,?,?,?)",
    [email, firstName, lastName, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username or password" });
      }
    }
  );
});

app.post("/holidaychecker", (req, res) => {
  const date = req.body.date;
  db.query(
    "SELECT 1 FROM holidays WHERE (date) = (?)",
    [date],
    (err, result) => {
      if (result.length > 0) {
        res.send({
          message:
            "This is a holiday. Becuase of the high traffic an extra fee will be applied",
        });
      } else {
        res.send({
          message: "Not a high traffic day so we retain our regular fees",
        });
      }
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      }
    }
  );
});

app.post("/reservationTimes", (req, res) => {
  const Date = req.body.Date;
  const times = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
    "10:00 PM",
    "12:00 AM",
  ];
  db.query(
    "SELECT * FROM reservations WHERE date = ?",
    [Date],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        for (let x = 0; x < times.length; x++) {
          var datePlusTime = Date + "" + times[x];
          db.query("INSERT INTO availableTables (id) VALUES (?)", [
            datePlusTime,
          ]);
        }

        res.send({ message: "All times available" });
      }
      console.log(err);
    }
  );
});

app.post("/findtables", (req, res) => {
  const Date = req.body.Date;
  const Time = req.body.time;
  const guest = req.body.guestNum;
  console.log(Time);
  var datePlusTime = Date + "" + Time;
  db.query(
    "SELECT * FROM availableTables WHERE id= ?",
    [datePlusTime],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "All tables available" });
      }
      console.log(err);
    }
  );
});

app.post("/reservation", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const billingadd = req.body.billingadd;
  const mailingadd = req.body.mailingadd;
  const phone = req.body.phone;
  const date = req.body.date;
  const time = req.body.time;
  const guest = req.body.guest;

  //CHECKS IF THERE IS A RESERVATION ALREADY MADE AT THAT DATE AND TIME.
  db.query(
    "SELECT 1 FROM reservations WHERE (date, time) = (?,?)",
    [date, time],
    (err, result) => {
      //IF A MATCH IS FOUND ON THE DATABASE, DONT MAKE THE RESERVATION, RETURN MESSAGE TO USER.
      if (result.length > 0) {
        res.send({
          message: "A Reservation has already been made at this time and date.",
        });
      }
      //IF A MATCH IS **NOT** FOUND, MAKE THE RESERVATION, RETURN MESSAGE TO THE USER.
      if (result.length == 0) {
        db.query(
          "INSERT INTO reservations (email, name, billing_address, mailing_address, phone, date, time, guest) VALUES (?,?,?,?,?,?,?,?)",
          [email, name, billingadd, mailingadd, phone, date, time, guest],
          (err, result) => {
            console.log(result);
            console.log(err);
          }
        );
        console.log(result);
        res.send({ message: "Thank you for the reservation!" });
      }
    }
  );
});

//app.get("/", (req, res) =>{});

app.listen(3001, () => {
  console.log("running on port 3001");
});
