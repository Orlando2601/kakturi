const db = require('../database/models');



const productsApi = async(req,res)=>{
    try {
        const lista =await  db.Producto.findAll({
            attributes:['id','nombre','descripcion']
        });

        const detalle =  await lista.forEach(element => {
            element.dataValues.urlDetalleProduct ="http://localhost:3001/api/producto/"+element.id;
        });

        return res.status(200).json({lista});
    } catch (error) {
        console.log(error)
    }


}

const detalleApiProducto = async(req, res)=>{
    try {
        const id = req.params.id
        const producto = await db.Producto.findByPk(id,{
            include:['material']
        })
        return res.json({producto})
    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    productsApi,
    detalleApiProducto
}