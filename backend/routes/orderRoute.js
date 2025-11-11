import express from 'express'
import { addOrder, showOrders, updateOrder } from '../controller/orderController.js'

const orderRoute = express.Router()

orderRoute.post('/addOrder', addOrder);

orderRoute.get('/showOrders', showOrders)

orderRoute.put('/updateOrder', updateOrder)

export default orderRoute