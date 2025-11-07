import Cart from '../models/cartModel.js'
import Order from '../models/orderModel.js';

export const addOrder = async (req, res) => {
    try {
        const orderDetail = Order(req.body);
        
        console.log(req.body)

        await orderDetail.save()
        res.status(200).json({message: "Added order"})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

// get all orders
export const showOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}