const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    discountCode: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    maxUsage: { type: Number, required: true }
    // You can add more fields like description, maxUsage, etc. as needed
});

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;