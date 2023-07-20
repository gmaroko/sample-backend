const express = require("express");
const Product = require("../models/product");
const User = require("../models/user");

const router = express.Router();

router.get("/all", async (req, res)=>{
    let products = await Product.find({deleted: false});
    res.json({
        statusCode: 200,
        successMessage: "Fetch product success",
        errorMessage: null,
        data: products
    });
})

router.post("/add", async (req, res)=>{
    let newProduct = new Product(req.body.product);
    let userDetails = req.body.user;
    let existingByUsername = await User.find({username: userDetails.username}); 
    if(existingByUsername.length >= 1 && existingByUsername[0].usertype === "ADMIN"){
        newProduct.save();
        res.json({
            statusCode: 201,
            successMessage: "Add product success",
            errorMessage: null,
            data: newProduct
        });
    } else {
        res.json({
            statusCode: 401,
            successMessage: null,
            errorMessage: "Not enough permission",
            data: null
        });
    }
})


module.exports = router;