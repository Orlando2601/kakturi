function masterMiddleware (req, res,next){
    


    req.session.usuarioLogueado.tipeUser === 'master' ? next() : res.redirect('/user/adminPerfil')
}/* middleware usado para redireccionar a adminPerfil cada vez que se acceda a traves de la ruta login  */

module.exports = masterMiddleware