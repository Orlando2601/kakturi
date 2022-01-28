/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../dataBase/dbProductos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
/* /////////////////////////////////////////////////////////////////////////////////// */
/* CONTROLADOR DE LA RUTA ADMIN ///////////////////////////////////////////////////////*/
const adminControllers ={
    nuevo:(req,res)=>{
        res.render('nuevoProducto')
    },
    guardarNuevo:(req, res)=>{
        let newReference = productos.length;
        
        if (req.file){
            let nuevo = {
                id:newReference + 1,
                ...req.body,
                imagen: req.file.filename
            }
            productos.push(nuevo)
			fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
			res.redirect('/')    
        }
        else{
            res.redirect('nuevo')
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
        res.render('editarProducto',{toEdit})
    },
    editarGuardar: (req,res)=>{
        let reference = req.params.id
        let toStore = productos.find(element => element.id == reference)
        
        if (req.file){
            let update = {
                id:reference,
                ...req.body,
                imagen: req.file.filename
                
            }
            productos[reference -1] = update
            fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
            res.redirect('/')
        }else {
            let update = {
                id:reference,
                ...req.body,
                imagen: toStore.imagen
                
            }
            productos[reference -1] = update
            fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
            res.redirect('/')
        }
    }
}
/* //////////////////////////////////////////////////////////////////////////////// */


module.exports = adminControllers;