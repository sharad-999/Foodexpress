const LocalStratagy=require('passport-local').Strategy
const Customer=require('../models/customer')
const bcrypt=require('bcrypt')
const Admin = require('../models/Admin')

function init(passport){
    passport.use(new LocalStratagy({usernameField:'email'},async(email,password,done)=>{
        const user =await Customer.findOne({email:email})
        if(!user){
            return done(null, false, { message: 'No user found' })
        }
        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null, user, { message: 'Logged in sucessfully.' })
            }
            return done(null, false, { message: 'Wrong username or password.' })
        }).catch(err=>{
            return done(null, false, { message: 'Something went wrong.' })
        })
    }
    )) 
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        Customer.findById(id,(err,user)=>{
            done(err,user)
        })
            
    })
}
// async function init(passport) {
// let isAdmin = 0
//     passport.use(new LocalStratagy({ usernameField: 'email' }, async (email, password, done) => {
        
//         if(await Customer.findOne({ email: email })){
//             var user
//             user = await Customer.findOne({ email: email })
//             isAdmin=0
//             isAdmin=await user
//         }
//         else if (await Admin.findOne({ email: email })) {
//             user = await Admin.findOne({ email: email })
//             // console.log("admin here");
//             isAdmin=1
//             isAdmin=await user
    //     }
    //     else {
    //         return done(null, false, { message: 'No user found' })
    //     }
    //         // console.log(password);
    //         // console.log(user.password);
    //         console.log(user);
    //         bcrypt.compare(password, user.password).then(match => {
    //             if (match) {
    //                 return done(null, user, { message: 'Logged in sucessfully.' })
    //         }
    //             return done(null, false, { message: 'Wrong username or password.' })
    //         }).catch(err => {
    //             console.log(err);
    //             return done(null, false, { message: 'Something went wrong.' })
    //         })
    //     } ))
    // passport.serializeUser((user, done) => {
    //     done(null, user._id)
    // })
    // passport.serializeUser((admin, done) => {
    //     done(null, admin._id)
    // })
    // passport.deserializeUser((id, done) => {
    //     Customer.findById(id, (err, user) => {
    //         if (!user) {
    //             Admin.findById(id, (err, user) => {
    //                 done(err, user)
    //             })
    //         }
    //         done(err, user)
    //     })

    // })
    // passport.deserializeUser((id, done) => {
    //     Customer.findById(id, (err, user) => {
    //         done(err, user)
    //     })
    // })
    
//     console.log(isAdmin);
//     if( isAdmin){
//     passport.deserializeUser(async(id, done) => {
//         await Admin.findById(id, (err, user) => {
//             done(err, user)
//         })
//         console.log('admin');
//     })
//     }else{
//         passport.deserializeUser(async(id, done) => {
//             await Customer.findById(id, (err, user) => {
//                 done(err, user)
//             })
//         })
//         console.log('customer');
//     }
// }
// async function init(passport) {
//     let isAdmin=0;
//     passport.use(new LocalStratagy({ usernameField: 'email' }, async (email, password, done) => {

//         var user = await Customer.findOne({ email: email })
//         if (!user) {  
//             user = await Admin.findOne({ email: email })
//             async (user)=>{
//                 isAdmin=1
//             }
//             (user);
//         }
//         else if(!user){
//             return done(null, false, { message: 'No user found' })
//         }
//         // console.log(password);
//         // console.log(user.password);
//         console.log(user);
//         bcrypt.compare(password, user.password).then(match => {
//             if (match) {
//                 return done(null, user, { message: 'Logged in sucessfully.' })
//             }
//             return done(null, false, { message: 'Wrong username or password.' })
//         }).catch(err => {
//             console.log(err);
//             return done(null, false, { message: 'Something went wrong.' })
//         })
//     }))
//     passport.serializeUser((user, done) => {
//         done(null, user._id)
//     })
//     // passport.serializeUser((admin, done) => {
//     //     done(null, admin._id)
//     // })
//     // passport.deserializeUser((id, done) => {
//     //     Customer.findById(id, (err, user) => {
//     //         if (!user) {
//     //             Admin.findById(id, (err, user) => {
//     //                 done(err, user)
//     //             })
//     //         }
//     //         done(err, user)
//     //     })

//     // })
//     // passport.deserializeUser((id, done) => {
//     //     Customer.findById(id, (err, user) => {
//     //         done(err, user)
//     //     })
//     // })

//     console.log(isAdmin);
//     if ( isAdmin) {
//         passport.deserializeUser(async (id, done) => {
//             await Admin.findById(id, (err, user) => {
//                 done(err, user)
//             })
//             console.log('admin');
//         })
//     } else {
//         passport.deserializeUser(async (id, done) => {
//             await Customer.findById(id, (err, user) => {
//                 done(err, user)
//             })
//         })
//         console.log('customer');
//     }
// }
module.exports=init