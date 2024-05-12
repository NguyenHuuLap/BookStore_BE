const CartItemService = require('../services/CartItemService')

const createCartItem = async (req, res) => {
    try { 
        const { user, cartItems } = req.body
       
        if ( !user && !cartItems  ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        console.log(req.body)
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
        const cartitemId = req.params.id
        console.log(cartitemId)
        if (!cartitemId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await CartItemService.getDetailsCartItem(cartitemId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createCartItem,
    getDetailsCartItem,
}