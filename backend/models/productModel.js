import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
})

export default mongoose.model("Products", productSchema, "Products");