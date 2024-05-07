const mongoose = require('mongoose');

const cartItemModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Mảng chứa thông tin của các sản phẩm trong giỏ hàng
    cartItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            discount: { type: Number },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        }
    ],
    // Tổng số tiền của giỏ hàng
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemModel);

module.exports = CartItem;