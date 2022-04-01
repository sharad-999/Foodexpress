const Customer=require('../../models/customer')
const session = require('express-session')
function homeController(){
      return{
           index(req,res){
            //    const user=await Customer.findOne({user:session.Cookie.user})
               res.render('home')
           }
      }
}
module.exports=homeController