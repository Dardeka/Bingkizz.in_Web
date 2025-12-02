import mongoose from 'mongoose'

const reviewDetail = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

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
    productReview: [reviewDetail],
    sold: {
        type: Number,
        required: false,
        default: 0
    },
    productStatus: {
        type: String,
        required: true,
        default: "Active"
    }
})

export default mongoose.model("Products", productSchema, "Products");