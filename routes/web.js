const expressLayout = require('express-ejs-layouts');
const authController = require('../src/http/controllers/customer/authController')
const homeController=require('../src/http/controllers/homeController')
const cartController=require('../src/http/controllers/customer/cartController')
const adminController=require('../src/http/controllers/Acontroller')
const orderController = require('../src/http/controllers/customer/orderController')
const statusController = require('../src/http/controllers/admin/statusController')
const adminOrderController = require('../src/http/controllers/admin/orderController')
const {guest,admin,chef,auth,menu}=require('../src/http/middleware/guest')
const upload=require('../src/http/middleware/upload')
const multer=require('multer')
const path = require('path')
const menuController = require('../src/http/controllers/menuController');
const { group } = require('console');

function initroutes(app){
   
    
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postlogin)
    app.get('/signup',guest,authController().register )
    app.post('/signup',authController().custregister)

    app.get('/logout',authController().logout)
    
    // app.get('/Admin/signup',adminController().adminsignup)
    // app.post('/Admin/signup',upload.single('file'),adminController().postadminsignup)
    // app.get('/chef/dashboard',chef,authController().chef)
    
    // app.get('/Admin/dashboard',admin,authController().admin);
    
    
    
    // Admin routes
    app.get('/admin/additem',admin,adminController().gadditem);
    app.post('/admin/additem', upload.single('file'),adminController().additem);
    
    app.get('/admin/addchef',admin,adminController().gaddchef);
    app.post('/admin/addchef',upload.single('file'),adminController().addchef);
    
    app.use(expressLayout) 
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
    
    app.get('/',homeController().index)
    //customer order
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders',auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    //cart
    app.get('/menu',menu,menuController().menu)
    app.get('/cart',menu,cartController().index)
    app.post('/update-cart', cartController().update)
}
module.exports=initroutes