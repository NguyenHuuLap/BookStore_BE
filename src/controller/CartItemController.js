const CartItemService = require('../services/CartItemService')

const createCartItem = async (req, res) => {
    try {
        const { user, cartItems } = req.body

        if (!user && !cartItems) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CartItemService.createCartItem(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCartItem = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await CartItemService.getDetailsCartItem(userId);
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const updateCartItem = async (req, res) => {
    try {
        const userId = req.body.userId;
        const cartItems = req.body;
        // const name = req.body.name
        // const amount = req.body.amount
        // const type = req.body.type
        // console.log(userId, cartItems)

        const response = await CartItemService.updateCartItem(userId, cartItems);

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    createCartItem,
    getDetailsCartItem,
    updateCartItem,
}