/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult, cookie, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const usersFilePath = path.join(__dirname, '../dataBase/dbUsers.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const masterUser = (req,res)=>{
            res.render('master/master.ejs',{usuarios})


}

const updateInfoMaster = (req,res)=>{
    const usersFilePath = path.join(__dirname, '../dataBase/dbUsers.json');
    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    console.log(req.body)
    let accion = req.body.tipoUser;
    let idUser = parseInt(req.body.id)
    
    console.log(accion)
    if(accion === 'eliminar'){
    
        usuarios.splice((idUser - 1), 1);
        usuarios.forEach((element, index) => {
            element.id = index + 1
        });
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
    }
    if(accion === 'comprador'){
        let toEdit = usuarios.find(element => element.id == idUser);
        toEdit.tipeUser = 'comprador'
        usuarios[idUser -1] = toEdit
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
    }
    if(accion === 'administrador'){
        let toEdit = usuarios.find(element => element.id == idUser);
        toEdit.tipeUser = 'administrador'
        usuarios[idUser -1] = toEdit
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
    }
    res.render('master/master.ejs',{usuarios})
}

module.exports ={
    masterUser,
    updateInfoMaster

}