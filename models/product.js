const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    deleted: {type: Boolean, default: false},
    image: {type: String, default: "https://randomwordgenerator.com/img/picture-generator/chair-1840011_640.jpg"}
});

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
