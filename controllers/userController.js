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
        console.log(usuarios)
        let usuarioAloguearse;
        if(errors.isEmpty()){
            for (let i=0; i < usuarios.length; i++){
                if(usuarios[i].correo == req.body.correo){
                    console.log(usuarios[i].correo)
                    if(bcryptjs.compareSync(req.body.contraseña, usuarios[i].contraseña)){
                       usuarioAloguearse = usuarios[i].nombre;

                        
                    }
                   
                }
                
            }
            if(usuarioAloguearse == undefined){
                console.log('No existe usuario')
                res.render('login')
                
            }
            req.session.usuarioLogueado = usuarioAloguearse
            console.log('este es el usuario logueado ' + req.session.usuarioLogueado)
            res.redirect('/products')
        }else{
            console.log(errors)
            res.render('login', {errors:errors.errors})
        }
    },
    registro: (req, res)=>{

        res.render('registro')
    },
    storeUser: (req, res)=>{
        const errors = validationResult(req)
        if(errors.isEmpty()){
            
            let newReference = usuarios.length
            let nuevoUser = {
                id: newReference + 1,
                ...req.body,
                contraseña: bcryptjs.hashSync(req.body.contraseña, 10)
                
            }
            console.log(nuevoUser)
            usuarios.push(nuevoUser)
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
            res.redirect('/') 
        }else{
            
            res.render('registro',{
                
                errors: errors.array(),
                old: req.body
            })
        }

    },
    admin:(req, res)=>{
        res.send('hola admin' + req.query.user)
    }
}

module.exports  = userController