import express from 'express'
import { addOrder, showOrders } from '../controller/orderController.js'

const orderRoute = express.Router()

orderRoute.post('/addOrder', addOrder);

orderRoute.get('/showOrders', showOrders)

export default orderRoute