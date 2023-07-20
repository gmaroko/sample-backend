const mongoose = require("mongoose");

function getDatabase(){
    let DB_URI = process.env.DB_URI;
    
    mongoose.connect(DB_URI);
    let db = mongoose.connection;

    db.once("open", ()=>{
        console.log("DB connection success");
    })

    db.on("error", ()=>{
        console.log("DB connection failed!");
    })

    return db;

}

module.exports = getDatabase;