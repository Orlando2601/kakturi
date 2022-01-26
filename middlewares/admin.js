let admins = ['Adda', 'Greta', 'Vim', 'Tim']

function admin(req, res, next){
    user = req.query.user
    if (user){
        admins.forEach(admin=>{
            user == admin ? next(): res.send('no esta')
        })
    }
}
module.exports = admin
/* middleware de prueba para la clase donde a traves de los req.querys requerimos un dato y lo comparamos con los usuarios ya almacenados en el array definido anteiormente
 */