/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult} = require('express-validator');
const { decodeBase64 } = require('bcryptjs');
const db = require('../database/models');


/* /////////////////////////////////////////////////////////////////////////////////// */
/* CONTROLADOR DE LA RUTA ADMIN ///////////////////////////////////////////////////////*/
const adminControllers ={
    nuevo:(req,res)=>{
        res.render('admin/nuevoProducto')
    },
    guardarNuevo: async(req, res)=>{
        const errores = validationResult(req);
        let errorsNew;
        (errores.errors.length > 0) 
        ? res.render('admin/editarProducto',{errors:errores.mapped(),old:req.body}) 
        : errorsNew = false;
       
        if (errorsNew === false && errores.errors.length === 0){
            if(req.file ){
                try {
                    const {titulo, descripcion, material, precio,colores} = req.body
                    const nuevoTamanioMaterial = await db.Material.findAndCountAll();   
                    const materiales = await db.Material.findOne({where:{tipo_material: material}});
                    let LibreMaterial = new Boolean()
                    !materiales ? LibreMaterial = true : LibreMaterial = false;
                    LibreMaterial? await db.Material.create({tipo_material:material}):console.log('Ya existe este material')
                    await db.Producto.create({
                        nombre:titulo,
                        descripcion,
                        precio,
                        imagen:req.file.filename,
                        id_material:!LibreMaterial?materiales.id:nuevoTamanioMaterial,
                        colores
                    });
                    return res.redirect('/');
                    

                
                } catch (error) {
                    console.log(error)
                };    
                //await db.create({nombre:titulo, descripcion, precio, imagen:req.file, colores})
 
                /* let nuevo = {
                    id:newReference + 1,
                    ...req.body,
                    imagen: req.file.filename,
                    colores: arrayColor
    
                }
                productos.push(nuevo)
                fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
                res.redirect('/'); */ 
            }else{
                res.render('admin/nuevoProducto',{errors:errores.mapped(),old:req.body})
            }
             
        }
    },
    eliminar:(req, res)=>{
        let ref = req.params.id
        productos.splice((ref - 1), 1);
        productos.forEach((element, index) => {
            element.id = index + 1
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
		res.redirect('/')
    },
    editar:async (req,res)=>{
        try {
            let id = parseInt(req.params.id)
            let toEdit = await db.Producto.findOne({where:{id:id},include:['material']});
            const {colores} = toEdit;
            const arrayColor = (colores.replace(/ /g,'')).split(',')
            res.render('admin/editarProducto',{toEdit,arrayColor})
            
        } catch (error) {
            console.log(error)
        }
        
        
        //res.render('admin/editarProducto',{toEdit})
    },
    editarGuardar: async(req,res)=>{
        const errores = validationResult(req);
        let errorsNew;
        (errores.errors.length > 0) 
        ? res.render('admin/editarProducto',{errors:errores.mapped(),toEdit:req.body}) 
        : errorsNew = false;
       
        if (errorsNew === false && errores.errors.length === 0){
            if(req.file){
                try {
                    const {titulo, descripcion, material, precio,colores} = req.body 
                    const materiales = await db.Material.findOne({where:{tipo_material: material}});
                    let LibreMaterial = new Boolean()
                    !materiales ? LibreMaterial = true : LibreMaterial = false;
                    LibreMaterial? await db.Material.create({tipo_material:material}):console.log('Ya existe este material')
                    await db.Producto.update({
                        nombre:titulo,
                        descripcion,
                        precio,
                        imagen:req.file.filename,
                        id_material:!LibreMaterial?materiales.id:nuevoTamanioMaterial,
                        colores
                    });
                    return res.redirect('/');
                    

                
                } catch (error) {
                    console.log(error)
                };    
                //await db.create({nombre:titulo, descripcion, precio, imagen:req.file, colores})
 
                /* let nuevo = {
                    id:newReference + 1,
                    ...req.body,
                    imagen: req.file.filename,
                    colores: arrayColor
    
                }
                productos.push(nuevo)
                fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
                res.redirect('/'); */ 
            }
             
        }
}
}
/* //////////////////////////////////////////////////////////////////////////////// */


module.exports = adminControllers;