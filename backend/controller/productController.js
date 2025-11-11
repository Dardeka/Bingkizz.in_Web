import Product from '../models/productModel.js'

export const addProduct = async (req, res) => {
    try {
        const productData = new Product(req.body);
        const { productName, productDesc, productStock, productPrice } = productData;
        const productImage = req.file ? `/images/${req.file.filename}` : ''

        const newProduct = await Product.create({
            productName,
            productDesc,
            productImg: productImage,
            productStock,
            productPrice
        })

        res.status(200).json(newProduct);
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

export const getCertainProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const targetProduct = await Product.findById({_id: id})

        if(!targetProduct){
            return res.status(404).json({message: "Product not found!"})
        }
        
        res.status(200).json(targetProduct)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}