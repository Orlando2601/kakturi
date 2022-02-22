/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult, cookie, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
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
        const usersFilePath = path.join(__dirname, '../dataBase/dbUsers.json');
        const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const errors = validationResult(req);
        const errores = errors.mapped();
        let usuarioAloguearse;
        if(errors.isEmpty()){
            for (let i=0; i < usuarios.length; i++){
                if(usuarios[i].correo == req.body.correo){
                    console.log(' la contraseña es')
                    console.log(usuarios[i].contraseña)
                    if(bcryptjs.compareSync(req.body.contraseña, usuarios[i].contraseña)){
                       
                       usuarioAloguearse = usuarios[i];
                      console.log(usuarios[i])
                       delete usuarioAloguearse.contraseña 
                       console.log(usuarios[i]) 
                       break;
                    } else{
                        res.render('users/login', {
                        
                        old:req.body})
                    }                   
                }
            }
            if(usuarioAloguearse == undefined){
                console.log('No existe usuario')
                return res.render('/user/login',{
                    errors:[correo.msg]
                })                
            }
            req.session.usuarioLogueado = usuarioAloguearse;
            console.log('el usuario es ' + req.session.usuarioLogueado)
            console.log('Datos de usuario', req.session)
            res.redirect('/user/adminPerfil')
        }else{
            
            res.render('users/login', {
                errors:errores,
                old:req.body
            })
            console.log(errores)
        }
    },
    registro: (req, res)=>{
        res.cookie('testing', 'holamundo', {maxAge:1000 * 30})
        res.render('users/registro')
    },
    storeUser: (req, res)=>{
       
        const errors = validationResult(req)
        const errores = errors.mapped();
        
        let newReference = usuarios.length
        if(errors.isEmpty()){
            let userInDB = usuarios.find(user => user.correo == req.body.correo);
            console.log(req.body.correo)
            if(userInDB === undefined && req.file){
                
                let nuevoUser = {
                    id: newReference + 1,
                    ...req.body,
                    contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
                    imagen:req.file.filename
                }
                usuarios.push(nuevoUser)
                fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
                res.redirect('/user/login') 
            }else{
                res.render('users/registro')
                console.log('Usuario registrado')
            }
        }else{ 
            console.log(errores)
            res.render('users/registro',{
            
                errors: errores,
                old: req.body
            })
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
    cerrarSesion: async (req,res)=>{
        try{
            await req.session.destroy();
            res.render('products/home')

        }catch(error){
            console.log(error)
        }
        
 
    }
}
/* ////////////////////////////////////////////////////////////////////// */
module.exports  = userController