import express from 'express'
import { addProduct, getCertainProduct, showProduct, updateProduct } from '../controller/productController.js'
import multer from 'multer'
import { storage } from '../config/cloudinary.js';

const upload = multer({ storage: storage })


const productRoute = express.Router();

productRoute.post('/add-product', upload.single('image'), addProduct)

productRoute.get('/show-products', showProduct)

productRoute.get('/show-products/:id', getCertainProduct)

productRoute.put('/update/:id', updateProduct)

export default productRoute