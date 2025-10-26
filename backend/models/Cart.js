module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define("Carts", {
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    });

    Carts.associate = (models) => {
        Carts.belongsTo(models.Users, {
            foreignKey: "userId"
        });
        Carts.hasMany(models.CartItems, {
            foreignKey: "CartId",
            onDelete: "CASCADE",
        })
    }

    return Carts
}