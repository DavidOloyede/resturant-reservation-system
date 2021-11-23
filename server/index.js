const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost', //change necessary information 
    user: 'root',
    password: 'password',
    database: 'cruddatabase',
});

//The following bulk code was used to check if the connection to the server was working. Use as test if needed.
/*
app.get("/", (req, res) =>{
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result) => {
        res.send("hello Jaime, bong bong");
    });
});
*/

app.get("/", (req, res) =>{});

app.listen(3001, () => {
    console.log('running on port 3001');
});

