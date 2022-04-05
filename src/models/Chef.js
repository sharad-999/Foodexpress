const mongoose=require('mongoose');
const validator=require('validator');
const { default: isEmail } = require('validator/lib/isemail');

const ChefSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
    },role: {
        type: String,
        default: 'chef'
    },
    image: {
        type: String,
        default: "file-1648374317914.jpg",
    }
}, { timestamps: true })

const Chef =new mongoose.model('Chef',ChefSchema);
module.exports=Chef;