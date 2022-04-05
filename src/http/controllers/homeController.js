const order =require('../../models/order')
const Item=require('../../models/menu')
const session = require('express-session')
function homeController(){
      return{
           async index(req,res){
            //    const user=await Customer.findOne({user:session.Cookie.user})
                  // let Isorder = await order.findOne({customerId:"ObjectId(\""+req.session.passport.user+"\")"})
                  // console.log(Isorder);
                        const items = await Item.find()
                  res.render('home', { items: items })
           }
      }
}
module.exports=homeController