const fs = require('fs');
const path = require('path')
const usersFilePath = path.join(__dirname, '../dataBase/dbUsers.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
    login: (req,res)=>{
        res.render('login')
    },
    registro: (req, res)=>{
        res.render('registro')
    },
    storeUser: (req, res)=>{
        let newReference = usuarios.length
        let nuevoUser = {
            id: newReference + 1,
            ...req.body
        }
        console.log(nuevoUser)
        usuarios.push(nuevoUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '))
        res.redirect('/') 
    }
}

module.exports  = userController