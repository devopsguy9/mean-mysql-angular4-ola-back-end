var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var UserSchema = new Schema({

     userName:{
         type:String,
        //  unique:true,
         index:true
     },
    email : {
        type : String,
        unique : true,
        index : true
    },
    password : {
        type : String
    },
    mobile: {
        type : Number
    },
});


var User = module.exports = mongoose.model('UserData',UserSchema);

//mongoose.model('User',UserSchema);

