/* IMPORTACION DE MODULOS //////////////////////////////////////////////////////////////*/
const db = require('../database/models');


const masterUser = async(req,res)=>{
            try {
                const listaUsuarios = await db.Usuario.findAll({
                    include: ['tipouser']
                });
                return res.render('master/master.ejs',{usuarios:listaUsuarios});
            } catch (error) {
                console.log(error)
            }      
}

const updateInfoMaster = async(req,res)=>{
    let accion = req.body.tipoUser;
    let idUser = parseInt(req.body.id)
    if(accion === 'eliminar'){
        try {
            await db.Usuario.destroy({where:{id:idUser}});
        } catch (error) {
            console.log(error)
        }
    }
    if(accion === 'comprador'){
        try {
            await db.Usuario.update({id_tipoUser:3},{where:{id:idUser}})
        } catch (error) {
            console.log(error)
        }

    }
    if(accion === 'administrador'){
        try {
            await db.Usuario.update({id_tipoUser:2},{where:{id:idUser}})
        } catch (error) {
            console.log(error)
        }
    }
    if(accion === 'master'){
        try {
            await db.Usuario.update({id_tipoUser:1},{where:{id:idUser}})
        } catch (error) {
            console.log(error)
        }
    }
    return res.redirect("/user/adminPerfil")
}

module.exports ={
    masterUser,
    updateInfoMaster

}