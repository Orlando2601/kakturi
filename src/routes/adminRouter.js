/* IMPORTACION DE MODULOS */
const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const path = require('path')
const multer = require('multer')
const {body} = require('express-validator')
const adminController = require('../controllers/adminController');
const guestMiddleware = require('../middlewares/guestMiddleware')
const notLogMiddleware =require('../middlewares/notLogMiddleware')
/* //////////////////////////////////////////////////////////////////////////////////////////// */

/* CONFIGURACION MULTER */
let multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
                    let folder = path.join(__dirname, '../public/images/dbProductos');
                    cb(null, folder)
    },
    filename:(req, file, cb)=>{
                    console.log(file);
                    const imageName = ('imagen' + Date.now() + path.extname(file.originalname))
                    cb(null, imageName);
    }
})
let fileUpload = multer({storage:multerDiskStorage});
let multerImageMidleware = fileUpload.single('imagen')
/* //////////////////////////////////////////////////////////////////////// */
/* VALIDACIONES */

const validaciones = [
    body('titulo')
        .notEmpty().withMessage('Debes ingresar nombre de producto'),
    body('descripcion')
        .notEmpty().withMessage('Debes ingresar descripcion'),
    body('precio')
        .notEmpty().withMessage('No has ingresado precio')
]

/* ADMINISTRACION DE RUTAS */
router.get('/nuevo', notLogMiddleware, adminController.nuevo);
router.post('/nuevo',multerImageMidleware, validaciones, adminController.guardarNuevo)
router.get('/editar/:id',notLogMiddleware, adminController.editar)
router.patch('/editar/:id',multerImageMidleware, adminController.editarGuardar)
router.delete('/eliminar/:id', adminController.eliminar)
/* //////////////////////////////////////////////////////////////////////// */
module.exports = router;