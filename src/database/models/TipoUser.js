module.exports = (sequelize, dataTypes) => {
    let alias = 'Tipouser';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        tipo_user: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName:"tipouser",
        timestamps: false,
        deletedAt: false
    }
    const Tipouser = sequelize.define(alias, cols, config);

    Tipouser.associate = function(models) {
        Tipouser.hasMany(models.Usuario, { 
            as: "usuarios", 
            foreignKey: "id_tipoUser"
        })
    }

    return Tipouser
};