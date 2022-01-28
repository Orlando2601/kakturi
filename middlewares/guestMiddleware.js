function guestMiddleware (req, res,next){
    if(req.session.usuarioLogueado){
        return res.render('adminPerfil',{
            user:req.session.usuarioLogueado
        });

    }
    next()
}

module.exports = guestMiddleware