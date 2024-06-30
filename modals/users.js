const { Timestamp } = require('mongodb');
const mongoose= require('mongoose');
const userschema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required:true
    }
},{Timestamp:true});

const User= mongoose.model('users',userschema);


module.exports=User;