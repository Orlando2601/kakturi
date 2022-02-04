/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const fs = require('fs');
const path = require('path')
const usersFilePath = path.join(__dirname, '../dataBase/dbUsers.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
/* /////////////////////////////////////////////////////////////////////////////////// */
/* CONTROLADOR DE LA RUTA USER ///////////////////////////////////////////////////////*/
const userController = {
    login: (req,res)=>{
        res.render('users/login')

    },
    userLog:(req,res)=>{
        const errors = validationResult(req);
        let usuarioAloguearse;
        if(errors.isEmpty()){
            for (let i=0; i < usuarios.length; i++){
                if(usuarios[i].correo == req.body.correo){
                    if(bcryptjs.compareSync(req.body.contraseña, usuarios[i].contraseña)){
                       
                       usuarioAloguearse = usuarios[i];
                       delete usuarioAloguearse.contraseña  
                    }                   
                }
            }
            if(usuarioAloguearse == undefined){
                console.log('No existe usuario')
                res.render('login')                
            }
            req.session.usuarioLogueado = usuarioAloguearse;
            console.log('Datos de usuario', req.session)
            res.redirect('/user/adminPerfil')
        }else{
            console.log(errors)
            res.render('login', {errors:errors.errors})
        }
    },
    registro: (req, res)=>{
        res.cookie('testing', 'holamundo', {maxAge:1000 * 30})
        res.render('users/registro')
    },
    storeUser: (req, res)=>{
        console.log(req.file);
        const errors = validationResult(req)
        let newReference = usuarios.length
        if(errors.isEmpty()){
            let userInDB = usuarios.find(user => user.correo == req.body.correo);
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
                console.log('revisa')
            }
        }else{ 
            
            res.render('users/registro',{
            
                errors: errors.array(),
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
    cerrarSesion: (req,res)=>{
        req.session.destroy();
        console.log(req.session)
        res.redirect('/')
    }
}
/* ////////////////////////////////////////////////////////////////////// */
module.exports  = userController