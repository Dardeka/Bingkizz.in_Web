import express from 'express'
import { createCart, showCart } from '../controller/cartController.js'
import { validateToken } from '../middlewares/AuthMiddleware.js'

const cartRoute = express.Router()

cartRoute.post('/init-cart', createCart)

cartRoute.get('/show-cart', validateToken, showCart)

export default cartRoute