const express = require('express')
const router = express.Router()
const { Carts, CartItems, Products } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddlewares');

// Get CART
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

// ADD to Cart
router.post("/add", validateToken, async (req, res) => {
  try{
    const { productId, quantity } = req.body;

    const userId = req.user.id

    let cart = await Carts.findOne({where: {userId}});
    if(!cart){
      cart = await Carts.create({userId});
    }

    let cartItem = await CartItems.findOne({where: {cartId: cartId, productId},});

    const product = await Products.findByPk(id);
    if(!product){
      return res.status(404).json({message: "Product Not Found"});
    }

    if(cartItem){
      cartItem.quantity += quantity;
      await cartItem.save()
    }else{
      await CartItems.create({
        cartId: cart.id,
        productId,
        quantity
      })
    }

    const allItems = await CartItems.findAll({
      where: { cartId: cart.id },
      include: Products,
    });

    let total = 0;
    allItems.forEach((item) => {
      total += item.quantity * item.Product.price;
    });

    cart.totalPrice = total;
    await cart.save();

    res.json({ message: "Product added to cart", cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
});

module.exports = router