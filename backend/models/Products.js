module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productImage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productStock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    Products.associate = (models) => {
        Products.hasMany(models.CartItems, {
            foreignKey: "productId",
            onDelete: "CASCADE",
        });
    };

    return Products
}