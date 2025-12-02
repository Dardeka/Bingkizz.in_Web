import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'
import mongoose from 'mongoose';

// create cart
export const createCart = async (req, res) => {
    try {
        const { cartItems, userId } = req.body;
        // console.log(req.body)
        // console.log("User id nya : ",userId)
        // console.log("Product id nya : ", cartItems[0].productId)

        if(!Array.isArray(cartItems) || cartItems.length === 0){
            return res.status(400).json({message: "Cart items must be a non empty array"})
        }

        let cart = await Cart.findOne({userId})
        if(!cart || !cart.cartItems){
            cart = new Cart({
                userId,
                cartItems: [],
                totalPrice: 0
            })
        }

        for(const item of cartItems){
            const {productId, quantity} = item;
            const targetProduct = await Product.findById(productId?.toString())

            if(!targetProduct){
                return res.status(404).json({message: "Product not found in database"})
            }

            // console.log("Product found! :", targetProduct)

            const existItem = cart.cartItems.find(
                (prod) => prod.productId.toString() === productId
            )

            if(existItem){
                existItem.quantity += quantity
            }else{
                cart.cartItems.push({productId, quantity})
            }
        }

        let total = 0
        for(const item of cart.cartItems){
            const products = await Product.findById(item.productId)
            if(products){
                total += products.productPrice * item.quantity
            }
        }

        cart.totalPrice = total;

        await cart.save()
        res.status(200).json({message: "Product added to cart"})
    } catch (error) {
        console.log("Failed to create cart. Error:", error)
    }
}

export const showCart = async (req, res) => {
  const { userId } = req.params;
  try {
    // const result = await Cart.find()
    const cart = await Cart.findOne({userId}).populate("cartItems.productId");

    if (!cart) return res.json({ message: "Cart not found" });

    const formattedCart = {
        
        CartItems: cart.cartItems.map((item) => {
            const uniqueId = item._id ? item._id.toString() : 
                             item.id ? item.id.toString() : 
                             item.productId?._id?.toString() || `fallback-${Math.random()}`
            return{
                id: uniqueId,
                quantity: item.quantity,
                Product: {
                    _id: item.productId._id,
                    productName: item.productId.productName,
                    productPrice: item.productId.productPrice,
                    productImg: item.productId.productImg,
                }
            }
        }),
        totalPrice: cart.totalPrice
    }
    res.json(formattedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export const deleteCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("DEBUG: Token tidak mengandung User ID.");
      return res.status(401).json({ error: "Token invalid, please login again." });
    }
    
    const { items } = req.body; 
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid items array" });
    }

    // 1. Konversi semua string ID dari request menjadi objek ObjectId
    const objectIdsToRemove = items.map(i => new mongoose.Types.ObjectId(i.productId)); // <-- PERUBAHAN UTAMA

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const initialItemCount = cart.cartItems.length;
    
    // 2. Gunakan .some() dan .equals() untuk memfilter
    cart.cartItems = cart.cartItems.filter(
      (item) => !objectIdsToRemove.some(
        (idToRemove) => idToRemove.equals(item.productId) // <-- PERUBAHAN UTAMA
      )
    );
    
    const removedCount = initialItemCount - cart.cartItems.length;
    
    if (removedCount === 0) {
        return res.status(404).json({ error: "No matching items found in cart to remove." });
    }
    
    // --- Perhitungan Ulang Total Harga (Logika yang Benar) ---
    let newTotal = 0;
    for (const item of cart.cartItems) {
        // item.productId di sini adalah ObjectId (sudah aman)
        const product = await Product.findById(item.productId); 
        if (product) {
            newTotal += product.productPrice * item.quantity; 
        } else {
            console.warn(`Product ID ${item.productId} not found during total price recalculation.`);
        }
    }

    cart.totalPrice = newTotal; 

    await cart.save();

    res.json({ message: `${removedCount} selected cart item(s) removed successfully.`, itemsRemoved: items.map(i => i.productId) });
  } catch (error) {
    console.error(error);
    // Pastikan error Mongoose (misal: ID tidak valid) tertangkap di sini
    res.status(500).json({ error: error.message });
  }
};