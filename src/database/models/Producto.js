module.exports = (sequelize, dataTypes)=>{
    let alias = 'Producto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            
        },
        nombre:{
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.INTEGER
        },
        imagen:{
            type:dataTypes.STRING,
            allowNull: false
        },
        colores:{
            type:dataTypes.INTEGER
        },
        id_material:{
            type:dataTypes.INTEGER
        }


    };
    let config = {
        tableName:"productos",
        timestamps: false,
        deletedAt: false

    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Material, {
            as: "material",
            foreignKey: "id_material"
        });

        
        

    }
    return Producto
}