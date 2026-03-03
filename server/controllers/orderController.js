const Order = require("../models/Order")
const Cart = require("../models/Cart")


exports.createOrder = async (req, res) => {
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
      paymentMethod: "Cash on Delivery",
      createdBy: req.user._id,
      updatedBy: req.user._id
    })

    cart.items = []
    cart.totalAmount = 0
    cart.updatedBy = req.user._id
    await cart.save()

    res.status(201).json(order)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedBy: req.user._id },
      { new: true }
    )

    res.json(order)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}