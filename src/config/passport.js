const LocalStratagy=require('passport-local').Strategy
const Customer=require('../models/customer')
const bcrypt=require('bcrypt')
const Admin = require('../models/Admin')

function init(passport){
    passport.use(new LocalStratagy({usernameField:'email'},async(email,password,done)=>{
        //login
        const user=await Customer.findOne({email:email})
        const admin = await Admin.findOne({ email: email})
        if(!user){
            console.log(admin);
            if(admin){
                bcrypt.compare(password, admin.password).then(match => {
                    if (match) {
                        return done(null, admin, { message: 'Logged in sucessfully.' })
                    }
                    return done(null, false, { message: 'Wrong username or password.' })
                }).catch(err => {
                    return done(null, false, { message: 'Something went wrong.' })
                })
            }
            return done(null,false,{message:'No user found'})
        }
        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null, user, { message: 'Logged in sucessfully.' })
            }
            return done(null, false, { message: 'Wrong username or password.' })
        }).catch(err=>{
            return done(null, false, { message: 'Something went wrong.' })
        })
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.serializeUser((admin, done) => {
        done(null, admin._id)
    })
    passport.deserializeUser((id,done)=>{
        Customer.findById(id,(err,user)=>{
            done(err,user)
        })
            
    })
    passport.deserializeUser((id, done) => {
        Admin.findById(id, (err, admin) => {
            done(err, admin)
        })
    })
}
module.exports=init