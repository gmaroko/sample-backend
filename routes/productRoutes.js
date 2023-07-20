const express = require("express");
const Product = require("../models/product");
const User = require("../models/user");

const router = express.Router();

router.get("/all", async (req, res)=>{
    let products = await Product.find({deleted: false});
    res.json({"products": products});
})

router.post("/add", async (req, res)=>{
    let newProduct = new Product(req.body.product);
    let userDetails = req.body.user;
    let existingByUsername = await User.find({username: userDetails.username}); 
    if(existingByUsername.length >= 1 && existingByUsername[0].usertype === "ADMIN"){
        newProduct.save();
        res.json({"message": newProduct});
    } else {
        res.json({"error": "Not enough permissions"});
    }
})


module.exports = router;