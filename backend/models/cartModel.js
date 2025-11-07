import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
}, {_id: false})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    cartItems: [cartItemsSchema],
    totalPrice: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Carts", cartSchema, "Carts")