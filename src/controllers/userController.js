/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const { validationResult, cookie, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const db = require('../database/models');

/* CONTROLADOR DE LA RUTA USER ///////////////////////////////////////////////////////*/
const userController = {
    login: (req,res)=>{
            return res.render('users/login');    

    },
    userLog:async(req,res)=>{
        try {
            const errores = validationResult(req);
            let user;
            let validacionPassword;
            (errores.errors.length > 0) ? res.render('users/login',{errors:errores.mapped(),old:req.body}) : user = await db.Usuario.findOne({where:{correo:req.body.correo},include:['tipouser']}); 
            !user ? res.render('users/login',{errors:{correo:{msg:'No se encontro el correo'}}}) : validacionPassword =  bcryptjs.compareSync(req.body.contraseña, user.contrasenia);
            !validacionPassword ? res.render('users/login',{errors:{contraseña:{msg:"Tu contrasena no coincide"}}}): delete user.contraseña; req.session.usuarioLogueado = user;
            req.body.recordame ? res.cookie('correo', req.body.correo,{maxAge:60000*60*12}): res.redirect('/admin/adminPerfil');
            console.log(user)
            return res.redirect('/user/adminPerfil');
        } catch (error) {
            console.log(error)
        }

    },
    registro: (req, res)=>{
        return res.render('users/registro')
    },
    storeUser: async(req, res)=>{
        try {
            const errores = validationResult(req);
            let user;
            (errores.errors.length > 0)?
            res.render('users/registro',{errors:errores.mapped(),old:req.body}) 
            : user = await db.Usuario.findOne({where:{correo:req.body.correo},include:['tipouser']});
            user?
            res.render('users/registro',{errors:{correo:{msg:"este correo ya se encuentra registrado"}},old:req.body})
            : user = false;
            if(user === false  && errores.errors.length === 0){
                if(req.file ){
                    const {nombre, apellido, correo, contraseña, repiteContraseña}=req.body;
                    delete repiteContraseña;
                    await db.Usuario.create({
                        nombre,
                        apellido,
                        correo,
                        contrasenia:bcryptjs.hashSync(contraseña, 10),
                        imagen:req.file.filename,
                        id_tipoUser:3
                    });
                    return res.redirect('/user/login')
                }else{
                    return res.render('users/registro',{errors:errores.mapped(),old:req.body})
                }
            }
        } catch (error) {
            console.log(error)
        }

    },
    admin:(req, res)=>{
        return res.send('hola admin' + req.query.user)
    },
    adminPerfil:async(req,res)=>{
        try {
            const lista = await  db.Producto.findAll({include: ['material']});
            
            return res.render('admin/adminPerfil',{
                user: req.session.usuarioLogueado,
                lista});

        } catch (error) {
            console.log(error)
        }  
    },
    cerrarSesion: (req,res)=>{
            res.clearCookie('correo')
            req.session.destroy();
            delete res.locals
           return res.render('users/login')

      
        
 
    }
}
/* ////////////////////////////////////////////////////////////////////// */
module.exports  = userController