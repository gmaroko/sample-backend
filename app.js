const express = require("express");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const getDatabase = require("./config/db");

const app = express();

let db = getDatabase();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Application is starting on port ${PORT}`);
});