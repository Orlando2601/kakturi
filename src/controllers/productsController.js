/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const req = require('express/lib/request');
const db = require('../database/models');
const Productos = db.Producto;
const Material = db.Material;

/* CONTROLADOR DE LA RUTA PRODUCTS ///////////////////////////////////////////////////////*/
const productsControllers ={
        products: async(req,res)=>{
            try {
                const lista =await  db.Producto.findAll({
                    include: ['material']
                });
                return res.render('products/products',{lista});
            } catch (error) {
                console.log(error)
            }
        },
        home: (req,res)=>{
           console.log(res.locals.pruebas)
            res.render('products/home')
        },
        detalle: async(req,res)=>{
            try {
                const id = req.params.id;
                const detalle = await db.Producto.findByPk(id,{include : ['material']});
                const {colores} = detalle;
                const arrayColor = (colores.replace(/ /g,'')).split(',')
                return res.render('products/detalleProducto', {lista:detalle, arrayColor});
            } catch (error) {
                console.log(error)
            }
            
        }
        
}
module.exports = productsControllers;