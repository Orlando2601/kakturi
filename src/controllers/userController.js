/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult, cookie, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const usersFilePath = path.join(__dirname, '../data/dbUsers.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
/* /////////////////////////////////////////////////////////////////////////////////// */
/* CONTROLADOR DE LA RUTA USER ///////////////////////////////////////////////////////*/
const userController = {
    login: async(req,res)=>{
        try{
            await res.render('users/login')
        }catch(error){

        }
        

    },
    userLog:(req,res)=>{
        const usersFilePath = path.join(__dirname, '../data/dbUsers.json');
        const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const errores = validationResult(req);
        let user;
        (errores.errors.length > 0) ? res.render('users/login',{errors:errores.mapped(),old:req.body}) : user =  usuarios.find(ele => ele.correo == req.body.correo);              
        let validacionPassword;
        !user ? res.render('users/login',{errors:{correo:{msg:'No se encontro el correo'}}}) : validacionPassword =  bcryptjs.compareSync(req.body.contraseña, user.contraseña);
        !validacionPassword ? res.render('users/login',{errors:{contraseña:{msg:"Tu contrasena no coincide"}}}): delete user.contraseña; req.session.usuarioLogueado = user;               
        req.body.recordame ? res.cookie('correo', req.body.correo,{maxAge:60000*60*12}): res.redirect('/admin/adminPerfil');
        return res.redirect('/user/adminPerfil');


    },
    registro: (req, res)=>{
        res.cookie('testing', 'holamundo', {maxAge:1000 * 30})
        res.render('users/registro')
    },
    storeUser: (req, res)=>{
        const errores = validationResult(req);
        let user
       
        (errores.errors.length > 0) ? res.render('users/registro',{errors:errores.mapped(),old:req.body}) : user =  usuarios.find(ele => ele.correo == req.body.correo);
        user ? res.render('users/registro',{errors:{correo:{msg:"este correo ya se encuentra registrado"}},old:req.body}): user = false;
        if(user === false  && errores.errors.length === 0){

            if( req.file){
                let newReference = usuarios.length
            
                let nuevoUser = {
                    id: newReference + 1,
                    ...req.body,
                    contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
                    imagen:req.file.filename,
                    tipeUser: "comprador"
                }
                delete nuevoUser.repiteContraseña;
                usuarios.push(nuevoUser)
                fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
               return res.redirect('/user/login') 
            }else{
                return res.render('users/registro',{errors:errores.mapped(),old:req.body})
            }

        }
    },
    admin:(req, res)=>{
        res.send('hola admin' + req.query.user)
    },
    adminPerfil:(req,res)=>{
        res.render('admin/adminPerfil',{
            user: req.session.usuarioLogueado,
            lista: productos
        })

        
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