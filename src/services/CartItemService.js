const CartItem = require("../model/CartItemModel")
const Product = require("../model/ProductModel")

const createCartItem = async (newCartItem) => {
    return new Promise(async (resolve, reject) => {
        const { user, cartItems } = newCartItem;
        try {
            // Kiểm tra xem có CartItem tương ứng với user không
            let existingCartItem = await CartItem.findOne({ user: user });

            if (existingCartItem) {
                // Nếu có, kiểm tra xem sản phẩm đã tồn tại trong cartItem hay chưa
                for (const newItem of cartItems) {
                    const existingProduct = existingCartItem.cartItems.find(item => item.name === newItem.name);
                    if (existingProduct) {
                        // Nếu sản phẩm đã tồn tại, cộng thêm số lượng (amount)
                        existingProduct.amount += newItem.amount;
                    } else {
                        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào cartItem
                        existingCartItem.cartItems.push(newItem);
                    }
                }
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
            const cartItems = await CartItem.findOne({
                user: id
            })
            if (cartItems === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: cartItems
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const updateCartItem = async (userId, cartItem) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm kiếm giỏ hàng của người dùng dựa trên userId
            const existingCartItem = await CartItem.findOne({ user: userId });

            if (existingCartItem) {
                // Tìm kiếm sản phẩm trong giỏ hàng dựa trên tên sản phẩm
                const itemToUpdate = existingCartItem.cartItems.find(item => item.name === cartItem.name);

                if (cartItem.type === 'decrease') {
                    if (itemToUpdate.amount > 1) {
                        itemToUpdate.amount -= 1;
                    } else {
                        resolve({
                            status: 'ERR',
                            message: 'Minimum quantity reached'
                        });
                        return;
                    }
                } else if (cartItem.type === 'increase') {
                    itemToUpdate.amount += 1;
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Invalid action type'
                    });
                    return;
                }
                
                // Lưu thay đổi vào cơ sở dữ liệu
                await existingCartItem.save();

                resolve({
                    status: 'OK',
                    message: 'Cart item quantity updated successfully',
                    data: existingCartItem
                });
            } else {
                // Nếu không tìm thấy sản phẩm, trả về lỗi
                resolve({
                    status: 'ERR',
                    message: 'Product not found in the cart'
                });
            }
        } catch (error) {
            // Nếu có lỗi xảy ra trong quá trình thực hiện, reject Promise với lỗi đó
            reject(error);
        }
    });
};


module.exports =
{
    createCartItem,
    getDetailsCartItem,
    updateCartItem,
};