const e = require('express')
const Cart = require('../database/cart')

exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if(error) return res.status(400).json({ error })
        if(cart) {
            
            let condition, update;
            const service = req.body.cartItems.service
            const item = cart.cartItems.find(carte => carte.service == service)

            if(item) {

                condition = { 'user': req.user._id, 'cartItems.service': service }
                update = { "$set": { "cartItems.$": { ...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity }}}
                
            } else {

                condition = { user: req.user._id }
                update = { "$push": { "cartItems": req.body.cartItems }}

            }

            Cart.findOneAndUpdate(condition, update)

            .exec((error, _cart) => {
                if(error) return res.status(400).json({ error })
                if(_cart) { return res.status(201).json({ cart: _cart })}
            })

        } else {

            const cart = new Cart({ 
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
        
            cart.save((error, cart) => {

                if(error) return res.status(400).json({ error })
                if(cart) { return res.status(201).json({ cart })}
            })
        }
    })

}