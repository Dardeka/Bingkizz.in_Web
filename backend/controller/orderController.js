import Order from '../models/orderModel.js';
import Product from '../models/productModel.js'

export const addOrder = async (req, res) => {
    try {
        const orderDetail = Order(req.body);

        const listOrder = []
        for(const i of orderDetail.items){
            const targetProduct = await Product.findById(i.productId)
            listOrder.push({
                productId : i.productId,
                productName: targetProduct.productName,
                quantity: i.quantity
            })
        }

        const newOrder = await Order.create({
            userId: orderDetail.userId,
            receiverName: orderDetail.receiverName,
            address: orderDetail.address,
            phoneNum: orderDetail.phoneNum,
            items: listOrder,
            grandTotal: orderDetail.grandTotal
        })

        const addedOrder = await newOrder.save()
        res.status(200).json({"newOrder": newOrder, "orderID": addedOrder._id})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateOrder = async (req, res) => {
    try {
        const {orderID, targetStatus, status} = req.body;
        console.log("Ini order ID : ", orderID)
        console.log("Ini status : ", status)
        
        if(targetStatus == "Payment"){
            const updateStatus = await Order.findByIdAndUpdate(orderID, {paymentStatus: status, shippingStatus: "Processing Order"}, {new: true})
        }else if(targetStatus == "Shipment"){
            const updateStatus = await Order.findByIdAndUpdate(orderID, {shippingStatus: status}, {new: true})
        }

        const orderNow = await Order.findById(orderID)
        res.status(200).json(orderNow)
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