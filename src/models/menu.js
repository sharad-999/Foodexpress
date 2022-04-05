const mongoose=require('mongoose')
const itemSchema= new mongoose.Schema({
    name:{type:String,required:true},
    catagory:{type:String,required:true},
    image: { type: String, required: true},
    price: { type: String,required: true},
    description: { type: String, required: true}
})
const Item=new mongoose.model('Item',itemSchema)
module.exports=Item