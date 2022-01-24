const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const adminControllers ={
    nuevo:(req,res)=>{
        res.render('nuevoProducto')
    }
}



module.exports = adminControllers;