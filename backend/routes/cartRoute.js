import express from 'express'
import { createCart, deleteCart, showCart } from '../controller/cartController.js'
import { validateToken } from '../middlewares/AuthMiddleware.js'

const cartRoute = express.Router()

cartRoute.post('/init-cart', createCart)

cartRoute.get('/show-cart/:userId', validateToken, showCart)

cartRoute.delete('/delete', validateToken, deleteCart)

export default cartRoute