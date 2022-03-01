/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult} = require('express-validator')

/* /////////////////////////////////////////////////////////////////////////////////// */
/* CONTROLADOR DE LA RUTA ADMIN ///////////////////////////////////////////////////////*/
const adminControllers ={
    nuevo:(req,res)=>{
        res.render('admin/nuevoProducto')
    },
    guardarNuevo:(req, res)=>{
        const errores = validationResult(req);
        console.log(errores.mapped())
        let newReference = productos.length;
        let colores = req.body.colores
        let arrayColor = (colores.replace(/ /g,'')).split(',')
        let errorsNew;
        (errores.errors.length > 0) 
        ? res.render('admin/nuevoProducto',{errors:errores.mapped(),old:req.body}) 
        : errorsNew = false;
       
        if (errorsNew === false && errores.errors.length === 0){
            if(req.file ){
                let nuevo = {
                    id:newReference + 1,
                    ...req.body,
                    imagen: req.file.filename,
                    colores: arrayColor
    
                }
                productos.push(nuevo)
                fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
                res.redirect('/') 
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
    editar:(req,res)=>{
        let id = req.params.id
        let toEdit = productos.find(element => element.id == id);
        res.render('admin/editarProducto',{toEdit})
    },
    editarGuardar: (req,res)=>{
        let reference = req.params.id
        let colores = req.body.colores
        let toStore = productos.find(element => element.id == reference)
        let arrayColor = (colores.replace(/ /g,'')).split(',')
        if (req.file){
            let update = {
                id:reference,
                ...req.body,
                imagen: req.file.filename,
                colores: arrayColor
                
            }
            productos[reference -1] = update
            fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
            res.redirect('/')
        }else {
            let update = {
                id:reference,
                ...req.body,
                imagen: toStore.imagen,
                colores: arrayColor
                
            }
            productos[reference -1] = update
            fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
            res.redirect('/')
        }
    }
}
/* //////////////////////////////////////////////////////////////////////////////// */


module.exports = adminControllers;