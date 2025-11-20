import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'
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

            console.log("Product found! :", targetProduct)

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
    // console.log("Isi param : ", req.params)

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
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

export const deleteCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("DEBUG: Token tidak mengandung User ID.");
      return res.status(401).json({ error: "Token invalid, please login again." });
    }
    console.log("Isi request : ", req.body);
    const cart = await Cart.findOne({userId: req.body.userId});

    console.log("Produk ditemukan:", req.body.items);
    for (const item in req.body.items){
        const updateCart = await (req.body.items[item].productId)
        console.log("Produk adalah :", updateCart);
    }

    cart.totalPrice = 0
    await cart.save();

    res.json({ message: "All cart items deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};