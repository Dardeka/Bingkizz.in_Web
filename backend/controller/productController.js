import Product from '../models/productModel.js'

// Add product
export const addProduct = async (req, res) => {
    try {
        const productData = new Product(req.body);
        const { productName, productDesc, productStock, productPrice } = productData;
        const productImage = req.file.path

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

// Show all product
export const showProduct = async (req, res) => {
    try {
        const allProducts = await Product.find()  
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// Show certain product
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

// update certain product
export const updateProduct = async (req, res) => {
    try {
        const { id, targetUpdate, newState, amount } = req.body
        
        if(targetUpdate === "Status"){
            await Product.findByIdAndUpdate(id, {productStatus: newState})
        }else if(targetUpdate === "Selling"){
            const targetProduct = await Product.findById(id)
            await Product.findByIdAndUpdate(id, {sold: targetProduct.sold+amount, productStock: targetProduct.productStock-amount})
        }
        
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log({error: error.message})
    }
}