const express = require('express'); /* Importamos modulo express */
const router = express.Router(); /* Definimos el método Router de express a la variable router para exportarla */
const path = require('path')
const masterController = require('../controllers/masterController');
const notLogMiddleware =require('../middlewares/notLogMiddleware')
const masterMiddleware  = require ('../middlewares/masterMiddleware')
router.get('/master',notLogMiddleware, masterMiddleware, masterController.masterUser);
router.post('/master', masterController.updateInfoMaster);

module.exports = router;