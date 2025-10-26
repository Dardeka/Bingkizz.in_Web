const express = require('express')
const router = express.Router()
const { Carts, CartItems, Products } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddlewares');

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Carts.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          include: [Products],
        },
      ],
    });

    if (!cart) return res.json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

router.post("/add", validateToken, async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Carts.findOne({ where: { userId } });
    if (!cart) {
      cart = await Carts.create({ userId });
    }

    let item = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    }

    res.json({ message: "Item added to cart", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

router.delete("/:cartItemId", async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await CartItem.destroy({ where: { id: cartItemId } });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = router