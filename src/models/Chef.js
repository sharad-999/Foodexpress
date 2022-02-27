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
        unique:[true,"This email is already in use."],
        validate(value){
            if(validator.isEmail(value)){
                 throw new Error("Invalid Email")
            }
        }
    }, 
    // phone:{
    //     type:Number,
    //     min:10,
    //     // max:10,
    //     requaired:true,
    //     unique:true
    // },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }, 
    // photo: {
    //     type: Image,
    //     required: true,
    //     unique: true
    // }
}, { timestamps: true })

const Chef =new mongoose.model('Chef',ChefSchema);
module.exports=Chef;