const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isemail');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'Admin'
    },
    // phone: {
    //     type: Number,
    //     length:10,
    //     requaired: true,
    //     unique: true
    // },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    admincode:{
        type:String,
    },
    image:{
    type:String,
    }
}, { timestamps: true})

const Admin = new mongoose.model('Admin',AdminSchema);
module.exports = Admin;