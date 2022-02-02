/* IMPORTANCION DE LOS MODULOS */
const fs = require('fs')
const path = require('path')
const logPath = path.resolve(__dirname, '../logs/log.txt')
/* //////////////////////////////////////////////////////////////////////////////////// */

function logMiddleware(req, res, next){
    fs.appendFileSync(logPath, "Se ingreso a la pagina " + req.url +" el dia " + new Date() + " \n")
    next()
}/* middleware encargado de guardar lso datos de la pagina visitada y el punto exacto en el tiempo de la visita */

module.exports = logMiddleware