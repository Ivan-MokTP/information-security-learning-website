const mysql = require('promise-mysql');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./connect');
const path = require('path');
const bcrypt = require('bcrypt');

const saltRound = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});*/

app.get('/', function (req, res) {
    console.log("Localhost connected")
});

// Register
app.post('/register', function(req, res){
    var pass = false;
    data = JSON.parse(req.query.data)
    console.log(data);
    var username = data.username,
        password1 = data.password1,
        password2 = data.password2;
    if (password1 == password2){
        pass = true;
    } 
    db.getConnection().then(function(conn){
        //Check if username exists
        conn.query("select username from wa_user where username=?", [username], function(err, result){
            if (result.length == 0){
                pass = true;
            }
        })
        
        //Insert user
    }).catch(function(err) {
        done(err);
    });
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, function(){
    console.log("App.js running on port 3000")
})