const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const userController = require('../controllers/userController');

router.get('/login', userController.login);





router.get('/registro', userController.registro)
router.post('/registro', userController.storeUser)


module.exports = router;