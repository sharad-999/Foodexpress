const authController = require('../src/http/controllers/customer/authController')
const homeController=require('../src/http/controllers/homeController')
const cartController=require('../src/http/controllers/customer/cartController')
const adminController=require('../src/http/controllers/Acontroller')
const {guest,admin,chef}=require('../src/http/middleware/guest')
const upload=require('../src/http/middleware/upload')
const multer=require('multer')
const path = require('path')
const menuController = require('../src/http/controllers/menuController')

function initroutes(app){
   
    app.get('/',homeController().index)

    app.get('/login',guest,authController().login)
    app.post('/login',authController().postlogin)
    app.get('/signup',guest,authController().register )
    app.post('/signup',authController().custregister)

    app.get('/logout',authController().logout)

    // app.get('/Admin/signup',adminController().adminsignup)
    // app.post('/Admin/signup',upload.single('file'),adminController().postadminsignup)
    app.get('/Admin/dashboard',admin,authController().admin);
    app.get('/chef/dashboard',chef,authController().chef)

    app.get('/Admin/additem',admin,adminController().gadditem);
    app.post('/Admin/additem', upload.single('file'),adminController().additem);
    
    app.get('/Admin/addchef',admin,adminController().gaddchef);
    app.post('/Admin/addchef',upload.single('file'),adminController().addchef);


    app.get('/cart',cartController().index)
    app.get('/menu',menuController().menu)
}
module.exports=initroutes