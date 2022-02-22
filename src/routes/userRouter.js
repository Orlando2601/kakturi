/* IMPORTACION DE MODULOS ////////////////////////////////////////////////////////////////////////////*/
const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const path = require('path')
const multer = require('multer')
const userController = require('../controllers/userController');
const { body } = require('express-validator');
/* //////////////////////////////////////////////////////////////////////////////////////////// */
/* IMPORTACION DE MIDDLEWARES////////////////////////////////////////////////////////////////// */
const logDBMiddleware = require('../middlewares/lodDBMiddleware')
const logMiddleware = require('../middlewares/logMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware')
const notLogMiddleware =require('../middlewares/notLogMiddleware')
/* ////////////////////////////////////////////////////////////////////////////////////////// */
/* CONFIGURACION MULTER */
/* VALIDACIONES DE CAMPOS //////////////////////////////////////////////////////////////////*/
const validaciones = [
    body('nombre').notEmpty().withMessage('Debes ingresar tu nombre'),
    body('apellido').notEmpty().withMessage('Debes ingresar tu apellido'),
    body('correo').notEmpty().withMessage('Debes ingresar un correo valido'),
    body('contraseña').notEmpty().withMessage('Debes ingresar una contrasenia')
];
const validacionesLog = [
    body('correo').notEmpty().withMessage('Debes ingresar un correo valido'),
    body('contraseña').notEmpty().withMessage('Debes ingresar una contrasenia')
];
/* ////////////////////////////////////////////////////////////////////////////////////////// */
/* CONFIGURACION MULTER */
let multerDiskStorageUser = multer.diskStorage({
    destination: (req, file, cb)=>{
                    let folder = path.join(__dirname, '../public/images/dbUsers');
                    cb(null, folder)
                    
    },
    filename:(req, file, cb)=>{
                    console.log(file);
                    const imageName = ('imagen' + Date.now() + path.extname(file.originalname))
                    cb(null, imageName);
                    
    }
})
let fileUploadUser = multer({storage:multerDiskStorageUser});
let multerImageMidlewareUser = fileUploadUser.single('imagen')


/* //////////////////////////////////////////////////////////////////////// */


/* ADMINISTRACION DE RUTAS ///////////////////////////////////////////////////////////////// */
router.get('/login',guestMiddleware,userController.login);
router.post('/login',validacionesLog,guestMiddleware, userController.userLog );
router.get('/adminPerfil', notLogMiddleware, userController.adminPerfil);
router.get('/cerrarSesion', userController.cerrarSesion);
router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro',multerImageMidlewareUser, validaciones,  userController.storeUser);
/* ///////////////////////////////////////////////////////////////////////////////////////// */

module.exports = router;
