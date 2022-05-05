const db = require('../database/models');

const listaUsuarios  = async(req, res)=>{
        try {
            const {rows, count} = await db.Usuario.findAndCountAll({
                attributes:['id','nombre','correo', 'imagen']
            });
       
                const lastUser = rows[rows.length-1]
                await rows.forEach(element => {
                element.dataValues.urlDetalleUser ="http://localhost:3001/api/usuario/"+element.id;
                const nombreImgUser =element.imagen;
                element.imagen=`http://localhost:3001/dbUsers/${nombreImgUser}`;
            });

            return res.status(200).json({listaUsers:rows, count, ultimoUsuario:lastUser})

            
        } catch (error) {
            console.log(error)
        }



}

const detalleUsuario = async(req, res)=>{
    try {
        const idUser = req.params.id
        const usuario = await db.Usuario.findByPk(idUser,{
            attributes:['id', 'nombre', 'apellido','correo','imagen']
        });
        const nombreImgUser = usuario.imagen;
        usuario.imagen = `http://localhost:3001/dbUsers/${nombreImgUser}`
        return res.json({usuario})
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    listaUsuarios,
    detalleUsuario
}

