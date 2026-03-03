const express = require("express")
const { protect, adminOnly } = require("../middleware/authMiddleware")

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController")

const router = express.Router()


router.post("/", protect, createOrder)


router.get("/", protect, getUserOrders)


router.get("/admin", protect, adminOnly, getAllOrders)


router.put("/admin/:id", protect, adminOnly, updateOrderStatus)

module.exports = router