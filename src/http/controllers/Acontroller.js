const Admin = require('../../models/Admin')
const bcrypt = require('bcrypt')
const upload = require('../middleware/upload')
const passport = require('passport')
const Customer = require('../../models/customer')
const Chef = require('../../models/Chef')
const item = require('../../models/menu')
function adminController() {
    return {
        adminsignup(req, res) {
            res.render('auth/Asignup')
        },
        async postadminsignup(req, res) {
            const { name, email, password, confirmpassword } = req.body
            //validate request
            if (!name || !email || !password || !confirmpassword) {
                req.flash('error', 'All fields are required')
                return res.redirect('/Admin/signup')
            }
            if (Admin.findOne(email) || Customer.findOne(email)) {
                try {
                    req.flash('error', 'Email is already in use')
                    return res.redirect('/Admin/signup')
                } catch (error) {
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
            if (req.file) {
                user.image = req.file.path
            }
            user.save().then((user) => {
                return res.redirect('/login')
            }).catch(err => {
                console.log(err);
                req.flash('error', 'something went wrong')
                return res.redirect('/Admin/signup')
            })
        },
        gadditem(req, res) {
            res.render('admin/additem')
        },
        additem(req, res) {
            const { name, catagory, price, description,file} = req.body
            console.log(req.body);
            if (!name || !catagory || !price || !description||!file) {
                req.flash('error', 'All fields are required')
                return res.redirect('/Admin/additem')
            }
            const newdish = new item({
                name: name,
                catagory:catagory,
                price: price,
                description:description
            })
            if (req.file) {
                newdish.image = req.file.path
            }
            console.log(newdish);
            newdish.save().then(() => {
                req.flash('error', 'item added sucessfully')
                return res.redirect('/Admin/additem')
            }).catch((e) => {
                console.log(e);
                req.flash('error', 'something went wrong')
                return res.redirect('/Admin/additem')
            })
        },
        gaddchef(req, res) {
            res.render('admin/addchef')
        },
        async addchef(req, res) {
            const { n, e, p,r} = req.body
            if (!n || !e || !p || !r) {
                req.flash('error', 'All fields are required')
                return res.redirect('/Admin/addchef')
            }
            if (await Customer.findOne({ email: e })) {
                req.flash('error', 'Email is already in use')
                return res.redirect('/Admin/addchef')
            }
            if (p.length < 8) {
                req.flash('error', 'Password is too small')
                return res.redirect('/Admin/addchef')
            }
            const hp = await bcrypt.hash(p, 10)
            const newchef = new Customer({
                name: n,
                email: e,
                password: hp,
                role:r
            })
            if (req.file) {
                newchef.image = req.file.path
            }
            console.log(newchef);
            newchef.save().then(() => {
                req.flash('error', 'chef added sucessfully')
                return res.redirect('/Admin/addchef')
            }).catch((e) => {
                console.log(e);
                req.flash('error', 'something went wrong')
                return res.redirect('/Admin/addchef')
            })
        }
    }
}
module.exports = adminController