const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const path = require('path');
const {productsApi, detalleApiProducto} = require('../controllers/productsApiController')

router.get('/productos', productsApi);
router.get('/producto/:id', detalleApiProducto)

module.exports = router;