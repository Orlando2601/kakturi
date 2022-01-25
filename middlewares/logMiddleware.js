const fs = require('fs')



function logMiddleware(req, res, next){
    fs.appendFileSync('log.txt', "Se ingreso a la pagina " + req.url +" el dia " + new Date() + " \n")
    next()
}

module.exports = logMiddleware