var User = require("../model/user");
var Rides = require("../model/rides");
var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);
var distance = require('google-distance');
exports.registerUser = function (req, res) {
    console.log(req.body);
    var userName=req.body.userName;
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password,salt);
    var mobile = req.body.mobile;
    
    var newUser = new User({
        userName:userName,
        email: email,
        password: password,
        mobile: mobile
    });
    User.findOne({ email: email }, function (err, event) {
        if (err) {
            res.send({status : false, message:"Error occured while finding if email exists", err});
            console.error(err);
        }
        else {
            if (event == null) {
                newUser.save(function (err1, result) {
                    if (err1) {
                        res.send({ status: false, message: "Registration failed", err1 });
                        console.error(err1);
                    } else {
                        res.send({ status: true, message: "Registration successful", result });
                        console.log(result);
                    }
                });
            } else {
                res.send({ status: false, message: "Email already exists", event });
                console.log("email already exists:" + event);
            }
        }
    });
}
// exports.loginUser = function(req, res){
//     var email = req.body.email;
//     var password = req.body.password;
//     User.findOne({email : email}, function(err,obj){
//        if(err){
//            res.send({status : false, message : "error occured while procesing login request"});
//            console.log(err);
//        } else {
//            if(obj == null){
//                res.send({status : false, message : "User not registered"});
//            } else {
//                if(obj.password == password){
//                    res.send({status : true, message : "login successful", obj});
//                    console.log(obj);
//                } else {
//                    res.send({status : false, message : "Incorrect password"});
//                    console.log(obj);
//                }
//            }
//        }
//     });
// }

exports.loginUser=function(req,res){
    
     console.log(req.body);
     var email=req.body.email;
    var password=req.body.password;

    
      User.findOne({email : email}, function(err,obj){
    
   if(err){
       res.send({status : false, message : "error occured while procesing login request"});
       console.log(err);
   } else {
       if(obj == null){
           res.send({status : false, message : "User not registered"});
       } else {


          bcrypt.compare(password, obj.password, (err, result)=>{
       if(result)
        {
        
        res.send({status : true, message : "login successful", obj: obj});
       }
    else
    {
        res.send({status : false, message : "Incorrect password"});
       }
})


       }

   }
});
}
exports.rideNow=function(req,res){
// var gmap = require('gmap');

var pickuploc=req.body.pickuploc;
var droploc=req.body.droploc;
var fare=req.body.fare;
var distance=req.body.distance;
var duration=req.body.duration;
var cabType=req.body.cabType;
var uid=req.body.uid;

 console.log(pickuploc);
 console.log(droploc);
  console.log(uid);

     var newRide = new Rides({
       pickuploc:pickuploc,
       droploc:droploc,
       fare:fare,
       distance:distance,
       duration:duration,
       cabType:cabType,
       uid:uid

    });
    console.log(newRide);
    newRide.save(function(err,result){
        if(err){
            return console.log(err);
        }
        else{
            console.log("ride saved");
        }
    });
    

}
exports.rideLogs=function(req,res){
      var uid=req.params.id;
        // console.log(uid);
    // var uid=req.body.uid; 
    Rides.find({ uid:uid }, function (err, result) {

         if (err) {
            res.send({status : false, message:"Error occured while finding if rides exists", err});
            console.error(err);
        }
        else {
            if (result == null) {
                
                res.send({ status: false, message: "No rides available"});
                //         console.log(result);
            } else {
                res.send({ status: true, message: "Rides Available:", result});
                console.log("Rides List:" + result);
            }
        }

    });

}

exports.searchcabs=function(req,res){
    var pickuploc=req.body.pickuploc;
    var droploc=req.body.droploc;

var distance = require('google-distance');
 
distance.get(
  {
    origin:pickuploc,
    destination:droploc
  },
  function(err, data) {
    if (err){
         return console.log(err);
    }
        else{
    console.log(data);
    res.send({ status: true, message: "Ride details:", data});
        }
});
}


exports.sendOtp=function(req,res){

    var email=req.body.email;

      User.findOne({email : email}, function(err,obj){
    
   if(err){
       res.send({status : false, message : "error occured while procesing login request"});
       console.log(err);
   } else {
       if(obj == null){
           res.send({status : false, message : "Email not Exist"});
       } else {
            //send otp to email (code)
          res.send({status : true,message : "Reset link sent to your registered Mail"});
          
       }

   }
});

}