const express = require('express')
const router = express.Router()
const { Carts, CartItems, Products } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddlewares');

// Get CART
router.get("/:userId", validateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Carts.findOne({
      where: { userId },
      include: [
        {
          model: CartItems,
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
    const { productId, quantity, userId } = req.body;

    // const userId = req.user.id
    console.log(userId)

    const product = await Products.findByPk(productId);
    if(!product){
      return res.status(404).json({message: "Product Not Found"});
    }

    let cart = await Carts.findOne({where: {userId}});
    if(!cart){
      cart = await Carts.create({userId});
    }

    let cartItem = await CartItems.findOne({where: {CartId: cart.id, productId},});

    if(cartItem){
      cartItem.quantity += quantity;
      await cartItem.save()
    }else{
      await CartItems.create({
        cartId: cart.id,
        productId: productId,
        quantity
      })
    }

    const allItems = await CartItems.findAll({
      where: { CartId: cart.id },
      include: Products,
    });

    let total = 0;
    allItems.forEach((item) => {
        // ✅ SOLUSI: Cek apakah item.Product TIDAK NULL sebelum mengakses propertinya
        if (item.Product) { 
              total += item.quantity * item.Product.productPrice; 
        } else {
            // Opsional: Log item yang bermasalah (productId yang hilang)
            console.log(`Peringatan: Item keranjang dengan ID Product ${item.productId} tidak ditemukan.`);
            // Anda bisa memilih untuk menghapus item keranjang ini jika produk sudah hilang
            // item.destroy(); 
        }
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