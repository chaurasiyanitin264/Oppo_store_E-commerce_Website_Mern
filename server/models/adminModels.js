const mongoose= require("mongoose");
const adminSchema=new mongoose.Schema({ 
    adminname:String,
    email:String, 
    password:String
})

module.exports = mongoose.model("admin", adminSchema);