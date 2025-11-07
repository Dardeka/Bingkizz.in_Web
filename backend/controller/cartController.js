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
        if(!cart){
            cart = new Cart({
                userId,
                cartItems: [],
                totalPrice: 0
            })
        }

        for(const item of cartItems){
            const {productId, quantity} = item;

            const targetProduct = await Product.findById(productId)
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
    const cart = await Cart.findOne({where: { userId }});

    if (!cart) return res.json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}