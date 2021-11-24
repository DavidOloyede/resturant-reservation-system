const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors= require("cors");
const e = require('express');

/*
const db = mysql.createPool({
    host: 'localhost', //change necessary information 
    user: 'root',
    password: 'password',
    database: 'cruddatabase',
});
*/


const db = mysql.createPool({
    host: 'localhost', //change necessary information 
    port: '3306',
    user: 'root',
    password: '123456789root',
    database: 'cruddatabase',
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

app.use(express.json())
app.use(cors());
app.post('/register', (req,res)=>{

    const email=req.body.email
    const firstName= req.body.firstName
    const lastName= req.body.lastName
    const password=req.body.password

    db.query("INSERT INTO users (email, firstName, lastName, password) VALUES (?,?,?,?)",
    [email, firstName, lastName, password], 
    (err, result)=>{
        console.log(err);
        }
    );
});

app.post('/login', (req,res)=>{
    const email=req.body.email
    const password=req.body.password

    db.query("SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password], 
    (err, result)=>{
        if(err){
            res.send({err:err});
        }
        if(result.length>0){
            res.send(result);
        }else{
            res.send({message:"Wrong username or password"});
        }
        
        }
    );
});

//app.get("/", (req, res) =>{});

app.listen(3001, () => {
    console.log('running on port 3001');
});

