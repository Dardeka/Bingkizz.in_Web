module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems',{
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    })

    return CartItems
}