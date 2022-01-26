const fs = require('fs')
const path = require('path')
const logPath = path.resolve(__dirname, '../logs/log.txt')


function logMiddleware(req, res, next){
    fs.appendFileSync(logPath, "Se ingreso a la pagina " + req.url +" el dia " + new Date() + " \n")
    next()
}

module.exports = logMiddleware