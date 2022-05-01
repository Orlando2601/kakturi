const fs = require('fs'); /* modulo para admin archivos */


function logDBMiddleware(req, res, next){
    fs.appendFileSync('logDB.txt', "Se creo un nuevo producto en la pagina " + req.url +" el dia " + new Date() + " \n")
    next()
};/* middleware para guardar en un txt cada vez que se crea un producto */

module.exports = logDBMiddleware