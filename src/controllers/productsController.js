/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');
const sequelize = db.sequelize;
/* /////////////////////////////////////////////////////////////////////////////////// */
const Productos = db.Producto;
const Material = db.Material;

/* CONTROLADOR DE LA RUTA PRODUCTS ///////////////////////////////////////////////////////*/
const productsControllers ={
        products: async(req,res)=>{
            try {
                const lista =await  db.Producto.findAll({
                    include: ['material']
                })
               
                 return res.render('products/products',{lista}) //res.json(lista);
            } catch (error) {
                console.log(error)
            }
           
           
                   
            //
        },
        home: (req,res)=>{
            res.render('products/home')
        },
        detalle: (req,res)=>{
            let id = req.params.id;
            let lista = productos.find(elemento => elemento.id == id);
            
            res.render('products/detalleProducto', {lista})
        },
        prueba: (req,res)=>{
            res.render('prueba')
        },
}
/* /////////////////////////////////////////////////////////////////////////////////// */
module.exports = productsControllers;