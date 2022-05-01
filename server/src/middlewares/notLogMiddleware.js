function notLogMiddleware (req, res,next){
   
       
    if(!req.session.usuarioLogueado){
        res.redirect('/user/login') 
    }    
    if(req.session.usuarioLogueado.id_tipoUser === 3){
        res.redirect('/')
    }
    next()

}/* middleware para garantizar que si no hay una sesion iniciada no se pueda acceder a adminPerfil por ningun medio */

module.exports = notLogMiddleware