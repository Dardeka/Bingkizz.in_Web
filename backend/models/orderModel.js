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

const productReview = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productReview: {
        type: String,
        required: true,
        default: ""
    }
})

const orderShipment = new mongoose.Schema({
    shippingReceiptImg: {
        type: String,
        required: true,
    },
    trackingNumber: {
        type: String,
        required: true
    },
    shippingCarrier: {
        type: String,
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    }
}, {_id: false})

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
    shippingDetail: [orderShipment],
    shippingStatus: {
        type: String,
        required: true,
        default: "Payment Verification"
    },
    itemsReview: [productReview],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})

export default mongoose.model("Orders", orderSchema, "Orders")