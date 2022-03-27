const mongoose=require('mongoose')
const itemSchema= new mongoose.Schema({
    name:{type:String,required:true},
    catagory:{type:String},
    image: {type: String,},
    price:{type:String},
    description:{type:String}
})
const Item=new mongoose.model('Item',itemSchema)
module.exports=Item