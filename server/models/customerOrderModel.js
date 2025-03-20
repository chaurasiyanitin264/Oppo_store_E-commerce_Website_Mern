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

// यह चेक करेगा कि मॉडल पहले से डिफाइन है या नहीं
const CustomerOrder = mongoose.models.customerorder || mongoose.model("customerorder", customerorderSchema);

module.exports = CustomerOrder;
