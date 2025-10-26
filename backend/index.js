const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const db = require('./models') 

// Routers
// USERS TABLE
const userRouter = require('./routes/Users');
app.use("/auth", userRouter)

// PRODUCTS TABLE
const productRouter = require('./routes/Products');
app.use('/products', productRouter)

// CARTS TABLE
const cartRouter = require('./routes/Cart');
app.use('/cart', cartRouter)

// handle image input for products
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
// app.use(express.static("public"));


db.sequelize.sync().then(() =>{
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
