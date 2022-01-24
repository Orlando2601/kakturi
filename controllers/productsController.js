const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsControllers ={
        products: (req,res)=>{
            res.render('products',{lista: productos})
        },
        home: (req,res)=>{
            res.render('home')
        },
        detalle: (req,res)=>{
            let id = req.params.id;
            let lista = productos.find(elemento => elemento.id == id);
            res.render('detalleProducto', {lista})
        },
        prueba: (req,res)=>{
            res.render('prueba')
        },
}



module.exports = productsControllers;