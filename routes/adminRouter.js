const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const adminController = require('../controllers/adminController');

router.get('/nuevo', adminController.nuevo);



module.exports = router;