var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var User = require("./server/route/usersdetails");
mongoose.connect("mongodb://localhost/oladb");
var db = mongoose.connection;

var app = express();

app.use(cors()); 

app.use(bodyParser.json());

app.post('/api/register', User.registerUser);
app.post('/api/login', User.loginUser);
app.post('/api/searchcabs', User.searchcabs);
app.post('/api/rideNow', User.rideNow);
app.get('/api/rideLogs/:id',User.rideLogs);
app.post('/api/sendOtp',User.sendOtp);
// app.get('/api/ridesLog',User.ridesLog);
app.listen(3019, function(){
    console.log("Server started on 3019");
});