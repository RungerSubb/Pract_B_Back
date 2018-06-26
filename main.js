var express = require("express");
var port = 3000;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();


var curSession = {
    user: '',
    inputTime: ''
};

app.use(bodyParser.json())
var users = [
    {username: 'admin', password: '1111'},
    {username: 'teacher', password: '2222'},
    {username: 'manager', password: '3333'},
];
//var sessionHandler = require('./js/session_handler');
//var store = sessionHandler.createStore();
app.use(cookieParser());
app.use(session({
   // store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
}));

app.get("/", function(req, res){

    res.sendFile(path.join('D:/pract/Pract_1.12', 'index.html'));
});
app.get('/', function (req, res) {
    res.sendFile(path.join('/', 'index.html'));
})
app.get('/logout', function (req, res) {
    if(curSession.user != '') {
        curSession.user = '';
        curSession.inputTime = '';
        console.log("Logged out");
        res.status(401).send('Logged out');

    } else{
        console.log("Logout failed");
        res.status(401).send('Logout error: no session');
    }

});


app.post('/login', function (req, res) {

    if(curSession.user == '') {
        var foundUser;

        for (var i = 0; i < users.length; i++) {
            var u = users[i];

            if (u.username == req.body.username && u.password == req.body.password) {
                foundUser = u.username;
                break;
            }
        }
        if (foundUser != undefined) {

            curSession.user = foundUser;
            curSession.inputTime = Date();

            console.log("Login succeeded: ", req.body.username);
            res.send('Login succeeded: ' + req.body.username);
        } else {
            console.log("Login failed: ", req.body.username);
            res.status(401).send('Login error: incorrect password or username');
        }
    } else {
        console.log("Login failed: ", "unfinished session");
        res.status(401).send('Login error: unfinished session');
    }
});




app.get('/session', function (req, res) {
    if(curSession.user != '') {

        console.log("User: " + curSession.user + "; logged at: "+ curSession.inputTime);
        res.status(401).send("User: " + curSession.user + "; logged at: "+ curSession.inputTime);

    } else{
        console.log("No session");
        res.status(401).send('No current session');
    }

})
app.listen(port, function () {
    console.log(('app running on port ' + port))
});



app.get('/guest', function (req, res) {
    res.status(401).send('Accepted!')
})

app.get('/user', function (req, res) {
    if(curSession.user.length > 0) {
        console.log('userpage: accepted');
        res.status(401).send('Accepted!')
    }
    else {
        console.log('userpage: denied');
        res.status(401).send('Denied!')
    }
})
app.get('/admin', function (req, res) {
    if(curSession.user == 'admin') {
        console.log('adminpage: accepted');
        res.status(401).send('Accepted!')
    }
    else {
        console.log('adminpage: denied');
        res.status(401).send('Denied!')
    }
})