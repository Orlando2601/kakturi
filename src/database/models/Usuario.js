module.exports = (sequelize, dataTypes)=>{
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: dataTypes.STRING,
            allowNull: false
        },
        correo:{
            type: dataTypes.STRING,
            allowNull: false
        },
        contrasenia:{
            type:dataTypes.STRING,
            allowNull: false
        },
        imagen:{
            type:dataTypes.STRING,
            allowNull: false
        },
        id_tipoUser:{
            type:dataTypes.INTEGER,
            allowNull: false
        }


    };
    let config = {
        tableName:"usuarios",
        timestamps: false,
        deletedAt: false

    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function (models) {
        Usuario.belongsTo(models.TipoUser, {
            as: "tipoUser",
            foreignKey: "id_tipoUser"
        });

        
        

    }
    return Usuario
}