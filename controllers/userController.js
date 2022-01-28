const fs = require('fs');
const path = require('path')
const usersFilePath = path.join(__dirname, '../dataBase/dbUsers.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

const userController = {
    login: (req,res)=>{
        res.render('login')

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
            res.render('adminPerfil', {
                user: req.session.usuarioLogueado
            })
        }else{
            console.log(errors)
            res.render('login', {errors:errors.errors})
        }
    },
    registro: (req, res)=>{
        res.cookie('testing', 'holamundo', {maxAge:1000 * 30})
        res.render('registro')
    },
    storeUser: (req, res)=>{
        const errors = validationResult(req)
        if(errors.isEmpty()){
            let userInDB = usuarios.find(user => user.correo == req.body.correo);
                if(userInDB === undefined){
                    let newReference = usuarios.length
                    let nuevoUser = {
                        id: newReference + 1,
                        ...req.body,
                        contraseña: bcryptjs.hashSync(req.body.contraseña, 10)
                        
                    }
                    
                    usuarios.push(nuevoUser)
                    fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
                    res.redirect('/user/login')
                }else{
                    res.render('registro')
                    console.log('el usuario ya xisye')
                }

            
 
        }else{
            
            res.render('registro',{
                
                errors: errors.array(),
                old: req.body
            })
        }

    },
    admin:(req, res)=>{
        res.send('hola admin' + req.query.user)
    },
    adminPerfil:(req,res)=>{
        res.redirect('/user/adminPerfil')

        
    }
}

module.exports  = userController