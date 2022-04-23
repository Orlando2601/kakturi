const db = require('../database/models');

const listaUsuarios  = async(req, res)=>{
        try {
            const listaUsers = await db.Usuario.findAll({
                attributes:['id','nombre','correo']
            });
       

            const nuevo =  await listaUsers.forEach(element => {
                element.dataValues.urlDetalleUser ="http://localhost:3000/api/usuario/"+element.id;
            });

            return res.status(200).json({listaUsers})

            
        } catch (error) {
            console.log(error)
        }



}

const detalleUsuario = async(req, res)=>{
    try {
        const idUser = req.params.id
        const usuario = await db.Usuario.findByPk(idUser,{
            include:['tipouser']
        })
        return res.json({usuario})
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    listaUsuarios,
    detalleUsuario
}

