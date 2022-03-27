const Customer=require('../../../models/customer')
const bcrypt=require('bcrypt')
const Admin = require('../../../models/Admin')
const passport = require('passport')
function authController() {
    const _get = (req) => {
        return req.user.role==='admin'?'/Admin/dashboard':'chef/dashboard'
    }
    return {
        chef(req,res){
            res.render('cdashboard')
        },
        admin(req,res){
            res.render('adashboard')
        },
        login(req, res) {
            res.render('auth/Login')
        },
        postlogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    // return res.redirect(_get)
                    if(user.role=="admin"){
                    return res.redirect('/Admin/dashboard')
                    }
                    else if(user.role=="chef"){
                        return res.redirect('/chef/dashboard')
                    }
                    else{
                        return res.redirect('/')
                    }
                }) 
            })(req,res,next)
        },
        register(req, res) {
            res.render('auth/signup')
        },
        async custregister(req,res){
            const{name,email,password,confirmpassword}=req.body
            //validate request
            if (!name || !email || !password || !confirmpassword){
                req.flash('error','All fields are required')
                return res.redirect('/signup')
            }
            // Customer.exists({email:email},(err,result)=>{
            //     if(result){
            //         req.flash('error','Email is already taken')
            //         return res.redirect('/signup')
            //     }
            // })
            if (await Customer.findOne({email:email})) {
                req.flash('error', 'Email is already in use')
                return res.redirect('/signup')
            }
            if(password.length<8){
                req.flash('error', 'Password is too small')
                return res.redirect('/signup')
            }
            if (password != confirmpassword){
                req.flash('error', 'password is not matching')
                return res.redirect('/signup')
            }
            const hashpassword=await bcrypt.hash(password,10)
            const user = new Customer({
                name:name,
                email:email,
                password:hashpassword
            })
            user.save().then((user)=>{
                //login
                console.log(user);
                return res.redirect('/login')
            }).catch(err=>{
                console.log(err);
                req.flash('error', 'something went wrong')
                return res.redirect('/signup')
            })
        },
        logout(req,res){
            req.logout()
            return res.redirect('/login')
        },
    }
}
module.exports = authController