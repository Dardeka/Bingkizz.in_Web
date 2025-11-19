import express from 'express'
import midtransClient from 'midtrans-client'
import dotenv from 'dotenv'

dotenv.config()

const checkoutRouter = express.Router();

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

checkoutRouter.post("/", async (req, res) => {
    try {
        const parameter = {
            transaction_details: {
                order_id: req.body.orderId,
                gross_amount: req.body.amount,
            },
            customer_details: {
                first_name: req.body.name,
                email: req.body.email,
            },
            callbacks: {
                finish: 'https://bingkizzin.vercel.app/',
            },
        };

        const transaction = await snap.createTransaction(parameter);
        res.json({ token: transaction.token });
    } catch (error) {
        console.error("Midtrans error:", error);
        res.status(500).json({ error: error.message});
    }
})

export default checkoutRouter