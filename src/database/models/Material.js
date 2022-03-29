module.exports = (sequelize, dataTypes) => {
    let alias = 'Material';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        tipo_material: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName:"material",
        timestamps: false,
        deletedAt: false
    }
    const Material = sequelize.define(alias, cols, config);

    Material.associate = function(models) {
        Material.hasMany(models.Producto, { 
            as: "productos", 
            foreignKey: "id_material"
        })
    }

    return Material
};