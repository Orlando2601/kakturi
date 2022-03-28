module.exports = (sequelize, dataTypes) => {
    let alias = 'TipoUser';
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
        tableName:"tipoUsers",
        timestamps: false,
        deletedAt: false
    }
    const TipoUser = sequelize.define(alias, cols, config);

    TipoUser.associate = function(models) {
        TipoUser.hasMany(models.Usuario, { 
            as: "usuarios", 
            foreignKey: "id_tipoUser"
        })
    }

    return TipoUser
};