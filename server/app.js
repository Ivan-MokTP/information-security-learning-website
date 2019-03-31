//const mysql = require('promise-mysql');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./connect');
const path = require('path');
const hash = require('object-hash');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'puiacademyisthebest',
    resave: false,
    saveUninitialized: true
}))


app.use(function(req, res, next){
    url = req.originalUrl.replace('/', ' ').trim().split('/')
    if(url[0] && url[0] == "Member"){
        if(req.session.name === undefined){
            res.redirect('/errorLogin.html');
            return
        }
    }
    next()
})

app.use(express.static(path.join(__dirname, '/../public')));
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

// Check if logged in
const checkAuth = function(req, res, next){
    if(req.session.name === undefined){
        res.redirect('/errorLogin.html')
        return
    }
    next();
}

app.get('/', function (req, res) {
    console.log("Localhost connected")
});

//----- Register -----
app.post('/register', function(req, res){
    var pass = false;
    var connection;
    var pwHash;
    var returnCode; //Return using json

    //JSON -> Object
    data = JSON.parse(req.query.data)

    //Check password
    var username = data.username,
        password1 = data.password1,
        password2 = data.password2;

    if(username.length < 3 || username.length > 20){
        returnCode = {status: 2}
        return res.json(returnCode);
    }

    if (password1.length < 6 || password1.length > 20){
        returnCode = {status: 3}
        return res.json(returnCode);
    }

    if (password1 !== password2){
        returnCode = {status: 4}
        return res.json(returnCode);
    }

    //Get connection and check username
    db.getConnection().then(function(conn){

        //Check if username exists
        connection = conn;
        var result = connection.query("select username from wa_user where username='"+username+"'")
        return result;
    }).then(function(result){
        if (result.length == 0) {
            pass = true;
        }
        else {
            returnCode = {status: 1}
            return res.json(returnCode);
        }
    }).then(function(){

        //Hash password with sha1
        pwHash = hash.sha1(password1);
        if(pass){

            //If flag then store credential in db
            connection.query("insert into wa_user (username, password) values ('"+username+"', '"+pwHash+"')")

            pool.releaseConnection(connection);
            returnCode = {status: 0}
            return res.json(returnCode);
        } else {
            pool.releaseConnection(connection);
        }
    }).catch(function(err) {
        console.log(err);
    });
});

//----- Login -----

app.post('/login', function(req, res){
    var connection;
    var pwHash;
    var returnCode; //Return using json

    //JSON -> Object
    data = JSON.parse(req.query.data)

    var username = data.username,
        password = data.password;

    //Get connection and check username and password
    db.getConnection().then(function(conn){

        //Check if username exists
        connection = conn;
        var result = connection.query("select username, password from wa_user where username='"+username+"'")
        pool.releaseConnection(connection);
        return result;
    }).then(function(result){
        //No such user
        if (result.length == 0) {
            returnCode = {status: 1};
            return res.json(returnCode);
        } else {
            //Check password
            pwHash = hash.sha1(password);
            if (pwHash == result[0]['password']){
                console.log('login success');
                if (username == 'puiadmin'){
                    req.session.name = 'admin';
                    returnCode = {status: 100, user: 'admin'};
                } else {
                    req.session.name = username;
                    returnCode = {status: 0, user: username};
                }
                return res.json(returnCode);
            } else {
                console.log('login failed -> wrong pw');
                returnCode = {status: 1};
                return res.json(returnCode);
            }
        }
    }).catch(function(err) {
        console.log(err);
    });
});

// ----- Login status -----

app.get("/loginStatus", function(req,res){
    var returnCode;
    if (req.session.name && req.session.name!= 'admin'){
        returnCode = {status: 'member', username: req.session.name}
    } else if (req.session.name && req.session.name == 'admin'){
        returnCode = {status: 'admin', username: 'admin'}
    } else {
        returnCode = {status: 'guest'}
    }
    console.log(returnCode)
    res.json(returnCode);
    return;
})

// ----- Logout -----

app.get('/logout', checkAuth, function(req, res){
    console.log("Logout")
    delete req.session.name;
    returnCode = {status: 0};
    return res.json(returnCode);
})

// ----- Read Chapter -----

app.post('/completeChapter', checkAuth, function(req, res){
    var data = JSON.parse(req.query.data);

    var chapter;
    var page;

    //Check chapter
    switch(data.chapter){
        case 0:
            chapter = "0";
            break;
        case 1:
            chapter = "1";
            break;
        case 2:
            chapter = "2";
            break;
        default:
            break;
    }

    //Check page
    switch(data.page){
        case 1:
            page = "1";
            break;
        case 2:
            page = "2";
            break;
        case 3:
            page = "3";
            break;
        default:
            break;
    }

    db.getConnection().then(function(conn){
        connection = conn;

        connection.query("select * from wa_chapter where username = '"+req.session.name+"' and chapter = '"+chapter+"' and page = '"+page+"'").then(function(row){
            if(row.length == 0){
                connection.query("insert into wa_chapter (username, chapter, page) values ('"+req.session.name+"', '"+chapter+"', '"+page+"')");
            } else return;
        })


        db.releaseConnection(connection);
    }).catch(function(err) {
        console.log(err);
    });
})

// ----- Load user progress -----

app.post("/userProgress", checkAuth, function(req, res){

    db.getConnection().then(function(conn){

        connection = conn;
        var c0 = 0, c1 = 0, c2 = 0;

        //Chapter 0
        connection.query("select * from wa_chapter where username = '"+req.session.name+"'").then(function(result){

            var resultArr = JSON.parse(JSON.stringify(result));
            for (var i = 0; i < resultArr.length; i++){
                switch(result[i].chapter){
                    case 0:
                        c0++;
                        break;
                    case 1:
                        c1++;
                        break;
                    case 2:
                        c2++;
                        break;
                    default:
                        break;
                }
            }
            var returnCode = {"username": req.session.name, "c0": c0, "c1": c1, "c2": c2};
            res.json(returnCode);

        })
        db.releaseConnection(connection);    
    })
})

// ----- Store quiz -----

app.post('/completeQuiz', checkAuth, function(req, res){
    var data = JSON.parse(req.query.data);

    var diff;

    switch(data.difficulty){
        case "Easy":
            diff = 0;
            break;
        case "Normal":
            diff = 1;
            break;
        case "Hard":
            diff = 2;
            break;
        default:
            break;
    }

    db.getConnection().then(function(conn){
        conn.query("insert into wa_quiz (username, difficulty, score) values ('"+req.session.name+"', '"+diff+"', '"+data.score+"')").then(function(){
            conn.query("select username from wa_quiz where username = '"+req.session.name+"' and difficulty = '"+data.difficulty+"'").then(function(row){
                var returnCode = {attempt: row.length};
                res.json(returnCode);
                return
            })
        })
        db.releaseConnection(conn);
    })
})

// ----- Load quiz stat-----

app.post('/userQuizStat', checkAuth, function(req, res){
    db.getConnection().then(function(conn){
        conn.query("select COUNT(score) as count, AVG(score) as avg, MAX(score) as max, MIN(score) as min from wa_quiz where username = '"+req.session.name+"' group by difficulty").then(function(result){
            var resultArr = JSON.parse(JSON.stringify(result));
            res.json(resultArr);
            return
        })
        db.releaseConnection(conn);
    })
})

// ----- Load quiz chart -----

app.post('/userQuizChart', checkAuth, function(req, res){

    db.getConnection().then(function(conn){

        conn.query("select difficulty, score from wa_quiz where username = '"+req.session.name+"'").then(function(result){
            var data = [];
            var arr0 = [], arr1 = [], arr2 = [];
            var resultArr = JSON.parse(JSON.stringify(result));

            for (var i = 0; i < resultArr.length; i++){
                switch(resultArr[i].difficulty){
                    case 0:
                        arr0.push(resultArr[i].score);
                        break;
                    case 1:
                        arr1.push(resultArr[i].score);
                        break;
                    case 2:
                        arr2.push(resultArr[i].score);
                        break;
                    default:
                        break;
                }
            }
            data = [arr0, arr1, arr2];
            res.json(data);
            return
        })
        db.releaseConnection(conn);
    })

})

app.post('/adminQuizStat', authCheck, function(req, res){
    
    db.getConnection().then(function(conn){
        conn.query("select COUNT(*) as count, AVG(score) from wa_quiz GROUP BY difficulty").then(function(result){
            resultArr = JSON.parse(JSON.stringify(result));
            console.log(resultArr);
        })
        
        db.releaseConnection(conn);
    })
})

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, function(){
    console.log("App.js running on port 3000")
})