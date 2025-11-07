import Product from '../models/productModel.js'

export const addProduct = async (req, res) => {
    try {
        const productData = new Product(req.body);
        const { productName, productImg, productDesc, productStock, productPrice } = productData;

        const savedProduct = await productData.save()
        res.status(200).json(savedProduct);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const showProduct = async (req, res) => {
    try {
        const allProducts = await Product.find()  
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}