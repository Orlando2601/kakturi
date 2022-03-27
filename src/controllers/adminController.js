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
        ? res.render('admin/nuevoProducto',{errors:errores.mapped(),old:req.body}) 
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
    eliminar:async(req, res)=>{
        try {
            const ref = parseInt(req.params.id);
            await db.Producto.destroy({where:{id:ref}});

            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
  
    },
    editar:async (req,res)=>{
        try {
            const id = parseInt(req.params.id)
            const toEdit = await db.Producto.findOne({where:{id:id},include:['material']});
            const {colores} = toEdit;
            const arrayColor = (colores.replace(/ /g,'')).split(',')
            res.render('admin/editarProducto',{toEdit,arrayColor})
            
        } catch (error) {
            console.log(error)
        }
    },
    editarGuardar: async(req,res)=>{
        const errores = validationResult(req);
        let errorsNew;
        let idToEdit = parseInt(req.params.id);
        
        errores.errors.length > 0 ? res.redirect(`/admin/editar/${idToEdit}`):errorsNew = false;
        if (errorsNew === false && errores.errors.length === 0){
            try {
                const {titulo, descripcion, material, precio,colores, imagen} = req.body
                console.log(req.body)
                const materiales = await db.Material.findOne({where:{tipo_material: material}});
                let LibreMaterial = new Boolean()
                !materiales ? LibreMaterial = true : LibreMaterial = false;
                LibreMaterial? await db.Material.create({tipo_material:material}):console.log('Ya existe este material')

                await db.Producto.update({
                        nombre:titulo,
                        descripcion,
                        precio,
                        imagen:req.file?req.file.filename:imagen,
                        id_material:!LibreMaterial?materiales.id:nuevoTamanioMaterial,
                        colores
                        },
                        {where:{id:idToEdit}
                    });
                return res.redirect('/');
            } catch (error) {
                console.log(error)
            };
            
        };
        
       
    }
             
        
};


module.exports = adminControllers;