const CartItem = require("../model/CartItemModel")
const Product = require("../model/ProductModel")

const createCartItem = async (newCartItem) => {
    return new Promise(async (resolve, reject) => {
        const { user, cartItems } = newCartItem;
        try {
            // Kiểm tra xem có CartItem tương ứng với user không
            let existingCartItem = await CartItem.findOne({ user: user });

            if (existingCartItem) {
                // Nếu có, cập nhật thông tin của CartItem
                existingCartItem.cartItems.push(...cartItems);
                await existingCartItem.save();
                resolve({
                    status: 'OK',
                    message: 'Cart item updated successfully',
                    data: existingCartItem
                });
            } else {
                // Nếu không, tạo mới CartItem
                const createdCartItem = await CartItem.create({
                    user: user,
                    cartItems: cartItems,
                });
                resolve({
                    status: 'OK',
                    message: 'Cart item created successfully',
                    data: createdCartItem
                });
            }
        } catch (error) {
            // Nếu có lỗi xảy ra trong quá trình thực hiện, reject Promise với lỗi đó
            reject(error);
        }
    });
};

const getDetailsCartItem = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cartitem = await CartItem.findById({
                _id: id
            })
            if (cartitem === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: cartitem
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
};

module.exports =
{
    createCartItem,
    getDetailsCartItem,
};