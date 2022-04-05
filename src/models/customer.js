const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isemail');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    role:{
        type: String,
        default:'customer'
    },
    // phone: {
    //     type: Number,
    //     min: 10,
    //     // max:10,
    //     unique: true
    // },

    image:{
        type:String,
        default:"file-1648374317914.jpg",
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
},{timestamps:true})

module.exports = mongoose.model('Customer', customerSchema);