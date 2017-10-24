var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RideSchema = new Schema({
    pickuploc:{
         type:String,
        //  unique:true,
         index:true
     },
    droploc: {
        type : String,
        index : true
    },
    fare:{
        type:String
    },
    distance:{
        type:String
    },
    duration:{
        type:String
    },
    cabType:{
        type:String
    },
    uid:{
        type:String
    },
    time : { type : Date, default: Date.now}
    
    
});
 module.exports = mongoose.model('Rides',RideSchema);
