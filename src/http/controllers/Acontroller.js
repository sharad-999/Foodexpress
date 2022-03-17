const Admin = require('../../models/Admin')
const bcrypt = require('bcrypt')
const upload = require('../middleware/upload')
const passport = require('passport')
const Customer = require('../../models/customer')
function adminController() {
    return {
        adminsignup(req, res) {
            res.render('auth/Asignup')
        },
        async postadminsignup(req, res){
                 const { name, email, password, confirmpassword} = req.body
                //validate request
                if (!name || !email || !password || !confirmpassword) {
                    req.flash('error', 'All fields are required')
                    return res.redirect('/Admin/signup')
                }
                if(Admin.findOne(email)||Customer.findOne(email)){
                    try{
                    req.flash('error', 'Email is already in use')
                    return res.redirect('/Admin/signup')
                    }catch(error){
                        console.log(error);
                    }
                }
                if (password.length < 8) {
                    req.flash('error', 'Password is too small')
                    return res.redirect('/Admin/signup')
                }
                if (password != confirmpassword) {
                    req.flash('error', 'password is not matching')
                    return res.redirect('/Admin/signup')
                }
                const hashpassword = await bcrypt.hash(password, 10)
                if (req.body.admincode != "Admin@FoodExpress") {
                    req.flash('error', 'Wrong Admin Code')
                    return res.redirect('/Admin/signup')
                }
                const user = new Admin({
                    name: name,
                    email: email,
                    password: hashpassword,
                })
                if(req.file){
                    user.image=req.file.path
                }
                user.save().then((user) => {
                    return res.redirect('/login')
                }).catch(err => {
                    console.log(err);
                    req.flash('error', 'something went wrong')
                    return res.redirect('/Admin/signup')
                })         
            },
    }
}
    module.exports=adminController