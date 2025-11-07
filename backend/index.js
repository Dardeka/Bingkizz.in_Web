import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected")
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`)
    })
}).catch((error) => console.log("Database connection failed : ",error));

// User Route
app.use("/api/", userRoute)

// Product Route
app.use("/api/product", productRoute)

// Cart Route
app.use("/api/cart", cartRoute)

// Order Route
app.use("/api/admin/order", orderRoute)

/* 
    1. Buat Controller 
    2. Buat models
    3. Buat routes
*/