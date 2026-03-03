const express = require("express")
const { protect, adminOnly } = require("../middleware/authMiddleware")

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")

const router = express.Router()

// Get All Products
router.get("/", getProducts)

// Create Product (Admin)
router.post("/", protect, adminOnly, createProduct)

// Update Product (Admin)
router.put("/:id", protect, adminOnly, updateProduct)

// Delete Product (Admin)
router.delete("/:id", protect, adminOnly, deleteProduct)

module.exports = router
