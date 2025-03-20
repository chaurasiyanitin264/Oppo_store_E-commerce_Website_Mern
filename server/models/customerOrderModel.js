const mongoose = require("mongoose");

const customerorderSchema = new mongoose.Schema({
  customername: String,
  product: String,
  amount: Number,
  address: String,
  city: String,
  email: String,
  contact: String,
  createdAt: { type: Date, default: Date.now }
});



module.exports =  mongoose.model("customerorder", customerorderSchema);
