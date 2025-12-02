import Order from '../models/orderModel.js';
import Product from '../models/productModel.js'

export const addOrder = async (req, res) => {
    try {
        const orderDetail = Order(req.body);
        console.log(orderDetail)

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
            grandTotal: orderDetail.grandTotal,
            createdAt: orderDetail.createdAt,
            updatedAt: orderDetail.updatedAt
        })

        const addedOrder = await newOrder.save()
        res.status(200).json({"detailOrder": addedOrder, "newOrder": newOrder, "orderID": addedOrder._id})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Update order in admin
export const updateOrder = async (req, res) => {
    try {
        const {orderId, targetStatus, status, updateTime} = req.body;
        console.log("Ini order ID : ", orderId)
        // console.log("Ini URL image: ", req.file.path)
        
        if(targetStatus == "Payment"){
            await Order.findByIdAndUpdate(orderId, {paymentStatus: status, shippingStatus: "Processing Order", updatedAt: updateTime}, {new: true})
        }else if(targetStatus == "Shipment"){
            await Order.findByIdAndUpdate(orderId, {shippingStatus: status, updatedAt: updateTime}, {new: true})
        }else if(targetStatus == "Canceled"){
            await Order.findByIdAndUpdate(orderId, {paymentStatus: "Cancelled", updatedAt: updateTime}, {new: true})
        }

        const orderNow = await Order.findById(orderId)
        res.status(200).json(orderNow)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateDelivery = async (req, res) => {
    try {
        const { orderId, shipmentNum, shipmentName, shipmentDate } = req.body
        const shipmentPicture = req.file.path
        const formattedDetail = {
            shippingReceiptImg: shipmentPicture,
            trackingNumber: shipmentNum,
            shippingCarrier: shipmentName,
            shippingDate: shipmentDate
        }
        console.log("Detail shipment: ", formattedDetail)
        await Order.findByIdAndUpdate(orderId, {shippingDetail: formattedDetail}, {new: true})

        const orderNow = await Order.findById(orderId)
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

// update certain order from user
export const updateCertainOrder = async(req, res) => {
    try {
        const { orderId, updateTime} = req.body
        console.log("The body : ",req.body)

        // update delivery confirmation
        await Order.findByIdAndUpdate(orderId, {shippingStatus: "Delivered", updatedAt: updateTime}, {new: true})

        const updatedDeliveryOrder = await Order.findById(orderId)
        console.log("The new status: ", updatedDeliveryOrder)
        res.status(200).json(updatedDeliveryOrder)
    } catch (error) {
        console.log({error: error.message})
    }
}