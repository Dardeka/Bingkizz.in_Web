import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    items: [orderItemsSchema],
    grandTotal: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    shippingStatus: {
        type: String,
        required: true,
        default: "Payment Verification"
    }
})

export default mongoose.model("Orders", orderSchema, "Orders")