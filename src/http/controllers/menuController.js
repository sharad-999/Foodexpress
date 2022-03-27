const Item=require('../../models/menu')

function menuController(){
    return{
        async menu(req,res){
            const items=await Item.find()
            res.render('customer/Menu', { items: items })
        }
    }
}


module.exports=menuController