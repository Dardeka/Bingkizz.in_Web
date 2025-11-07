import express from 'express'
import { addProduct, showProduct } from '../controller/productController.js'

const productRoute = express.Router();

productRoute.post('/add-product', addProduct)

productRoute.get('/show-products', showProduct)

export default productRoute