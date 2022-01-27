const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const userController = require('../controllers/userController');
const logDBMiddleware = require('../middlewares/lodDBMiddleware')
const { body } = require('express-validator');
const logMiddleware = require('../middlewares/logMiddleware');
/* const admin = require('../middlewares/admin') */ /* require del middleware */

/* VALIDACIONES DE CAMPOS */
const validaciones = [
    body('nombre').notEmpty().withMessage('Debes ingresar tu nombre'),
    body('apellido').notEmpty().withMessage('Debes ingresar tu apellido'),
    body('correo').notEmpty().withMessage('Debes ingresar un correo valido'),
    body('contraseña').notEmpty().withMessage('Debes ingresar una contrasenia')
];


router.get('/login',userController.login);
router.post('/login',validaciones, userController.userLog )


/* router.get('/admin',admin,  userController.admin) *//* ruta prueba de middleware */








/* ///////////////////// */




router.get('/registro', userController.registro)
/* router.post('/registro', validaciones, logDBMiddleware,  userController.storeUser)
 */
router.post('/registro', validaciones,  userController.storeUser)


module.exports = router;