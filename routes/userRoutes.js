const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res)=>{
    let newUser = new User(req.body);
    let existingByUsername = await User.find({username: newUser.username});
    if(existingByUsername.length >= 1){
       res.json({"error": "Username already used"});
    }
    let existingByEmail = await User.find({email: newUser.email});
    if(existingByEmail.length >= 1){
       res.json({"error": "email already used"});
    }
    newUser.save();
    res.json({"message": "User registration success"});
});


router.post("/login", async (req, res)=>{
    let loginInfo  = req.body;
    let user = await User.find({username: loginInfo.username, password: loginInfo.password})
    if(user.length >= 1){
        // jwt
        res.json({"message": "User login success"});
    } else {
        res.json({"error": "User login failed"});
    }
});

module.exports = router;