const Cart = require("../models/Cart")
const Product = require("../models/Product")


exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        let cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] })
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        )

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            })
        }

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )

        cart.updatedBy = req.user._id

        await cart.save()

        res.json(cart)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product")

        res.json(cart || { items: [], totalAmount: 0 })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body

        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        )

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" })
        }

        item.quantity = quantity

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                item => item.product.toString() !== productId
            )
        }

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )

        cart.updatedBy = req.user._id

        await cart.save()

        res.json(cart)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}