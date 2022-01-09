const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const mainController = require('../controllers/mainController');

/* Definimos las rutas de trabajo con el metodo router*/
router.get('/products', mainController.products);
router.get('/', mainController.home)
router.get('/detalleProducto/:id',mainController.detalle )

module.exports = router;