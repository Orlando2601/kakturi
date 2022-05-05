const db = require('../database/models');



const productsApi = async(req,res)=>{
    try {
        const {rows, count} =await  db.Producto.findAndCountAll({
            attributes:['id','nombre','descripcion']
        });
        const lastProduct = rows[rows.length-1]
        await rows.forEach((element, index) => {
            element.dataValues.urlDetalleProduct ="http://localhost:3001/api/producto/"+element.id;
            
        });

        return res.status(200).json({lista:rows, count, ultimoProducto:lastProduct});
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