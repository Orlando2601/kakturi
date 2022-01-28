/* IMPORTACION DE MODULOS ////////////////////////////////////////////////////////////////////////////*/
const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const userController = require('../controllers/userController');
const { body } = require('express-validator');
/* //////////////////////////////////////////////////////////////////////////////////////////// */
/* IMPORTACION DE MIDDLEWARES////////////////////////////////////////////////////////////////// */
const logDBMiddleware = require('../middlewares/lodDBMiddleware')
const logMiddleware = require('../middlewares/logMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware')
const notLogMiddleware =require('../middlewares/notLogMiddleware')
/* ////////////////////////////////////////////////////////////////////////////////////////// */

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
/* ADMINISTRACION DE RUTAS ///////////////////////////////////////////////////////////////// */
router.get('/login',guestMiddleware,userController.login);
router.post('/login',validacionesLog, userController.userLog );
router.get('/adminPerfil', notLogMiddleware, userController.adminPerfil);
router.get('/cerrarSesion', userController.cerrarSesion);
/* ///////////////////////////////////////////////////////////////////////////////////////// */











/* ///////////////////// */




router.get('/registro', guestMiddleware, userController.registro)
/* router.post('/registro', validaciones, logDBMiddleware,  userController.storeUser)
 */
router.post('/registro', validaciones,  userController.storeUser)


module.exports = router;
