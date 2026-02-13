const express = require("express")
const Order = require("../models/Order")
const Cart = require("../models/Cart")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()


router.post("/", protect, async (req, res) => {
    try {
        const { shippingAddress } = req.body

        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" })
        }

        const order = await Order.create({
            user: req.user._id,
            items: cart.items,
            totalAmount: cart.totalAmount,
            shippingAddress,
            paymentMethod: "Cash on Delivery"
        })


        cart.items = []
        cart.totalAmount = 0
        await cart.save()

        res.status(201).json(order)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.get("/", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product")

        res.json(orders)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const { adminOnly } = require("../middleware/authMiddleware")


router.get("/admin", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


router.put("/admin/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


module.exports = router
