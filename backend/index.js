import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import checkoutRouter from "./routes/checkoutRoute.js"
import serverless from "serverless-http"

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())

// to make all images accessible from URL
app.use('/images', express.static('public/images'));

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

// mongoose.connect(MONGOURL)

// mongoose.connect(MONGOURL).then(() => {
//     console.log("Database is connected")
//     app.listen(PORT, () => {
//         console.log(`Server is running in port ${PORT}`)
//     })
// }).catch((error) => console.log("Database connection failed : ",error));

let isConnected = false;
const connectDB = async () => {
    if (isConnected) return; // Gunakan koneksi yang sudah ada jika tersedia

    try {
        await mongoose.connect(MONGOURL);
        isConnected = true;
        console.log("Database connected successfully (Serverless)");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

await connectDB()

app.get("/", (req, res) => {
    res.send("Serverless API Running");
});

// User Route
app.use("/api", userRoute)

// Product Route
app.use("/api/product", productRoute)

// Cart Route
app.use("/api/cart", cartRoute)

// Checkout Route
app.use('/api/checkout', checkoutRouter)

// Order Route
app.use("/api/admin/order", orderRoute)

// export default app
// Ekspor handler utama (wajib untuk serverless)
export const handler = serverless(app);

// Ekspor app Express secara default (berguna untuk testing lokal)
export default app;