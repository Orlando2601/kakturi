const fs = require('fs')



function logDBMiddleware(req, res, next){
    fs.appendFileSync('logDB.txt', "Se creo un nuevo producto en la pagina " + req.url +" el dia " + new Date() + " \n")
    next()
}

module.exports = logDBMiddleware