function guest (req,res,next){
    if(!req.isAuthenticated()){
        return next()
    }
    return res.redirect('/')
}
function admin (req,res,next){
    if (req.isAuthenticated()&&req.user.role==='admin'){
        return next()
    }
    return res.redirect('/')
}
function chef (req,res,next){
    if (req.isAuthenticated()&&req.user.role==='chef'){
        return next()
    }
    return res.redirect('/')
}
function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/login')
}
function menu(req, res, next) {
    if (req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'chef')) {
        return res.redirect('/')
    }
    return next()
}

module.exports={guest,admin,chef,auth,menu}