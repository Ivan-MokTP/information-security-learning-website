const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./connect');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    //res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/')

app.post('/register', function(req, res){
    var username = req.body.username,
        password1 = req.body.password1,
        password2 = req.body.password2;
    if (password1 === password2){
        res.send('Same')
    } else {
        res.send('Not same')
    }
})

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, function(){
    console.log("App.js running on port 3000")
})