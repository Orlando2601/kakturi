function guestMiddleware (req, res,next){
    if(req.session.usuarioLogueado){
        return res.render('adminPerfil',{
            user:req.session.usuarioLogueado
        });

    }
    next()
}/* middleware usado para redireccionar a adminPerfil cada vez que se acceda a traves de la ruta login  */

module.exports = guestMiddleware