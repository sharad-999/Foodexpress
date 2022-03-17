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

module.exports={guest,admin,chef}