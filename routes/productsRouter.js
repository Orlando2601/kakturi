const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const productsController = require('../controllers/productsController');

/* Definimos las rutas de trabajo con el metodo router*/
router.get('/products', productsController.products);
router.get('/', productsController.home)
router.get('/detalleProducto/:id',productsController.detalle )

module.exports = router;