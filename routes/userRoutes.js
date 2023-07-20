const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res)=>{
    let newUser = new User(req.body);
    let existingByUsername = await User.find({username: newUser.username});
    if(existingByUsername.length >= 1){
       res.json({
        statusCode: 400,
        successMessage: null,
        errorMessage: "Username already taken",
        data: null
    });
    }
    let existingByEmail = await User.find({email: newUser.email});
    if(existingByEmail.length >= 1){
        res.json({
            statusCode: 400,
            successMessage: null,
            errorMessage: "Email already taken",
            data: null
        });
    }
    newUser.save();
    res.json({
        statusCode: 201,
        successMessage: "User created successfully",
        errorMessage: null,
        data: null
    });
});


router.post("/login", async (req, res)=>{
    let loginInfo  = req.body;
    let user = await User.find({username: loginInfo.username, password: loginInfo.password})
    if(user.length >= 1){
        res.json({
            statusCode: 200,
            successMessage: "Login success",
            errorMessage: null,
            data: {username:  user.username}
        });
    } else {
        res.json({
            statusCode: 401,
            successMessage: null,
            errorMessage: "Login failed",
            data: null
        });
    }
});

module.exports = router;