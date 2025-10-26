module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems',{
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    })

    CartItems.associate = (models) => {
        CartItems.belongsTo(models.Carts, {
            foreignKey: "cartId"
        });
        CartItems.hasMany(models.Products, {
            foreignKey: "id",
            onDelete: "CASCADE",
        });
    }

    return CartItems
}