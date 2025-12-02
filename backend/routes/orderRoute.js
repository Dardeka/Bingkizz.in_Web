import express from 'express'
import { addOrder, showOrders, updateCertainOrder, updateDelivery, updateOrder } from '../controller/orderController.js'
import multer from 'multer'
import { storage } from '../config/cloudinary.js';

const upload = multer({ storage: storage })

const orderRoute = express.Router()

orderRoute.post('/addOrder', addOrder);

orderRoute.get('/showOrders', showOrders)

// update order from admin
orderRoute.put('/updateOrder', updateOrder)

// update delivery
orderRoute.put('/updateDelivery', upload.single('shipmentPic'), updateDelivery)

// Update from user
orderRoute.put('/update', updateCertainOrder)

export default orderRoute