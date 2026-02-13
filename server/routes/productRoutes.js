const express = require("express")
const Product = require("../models/Product")
const { protect, adminOnly } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.put("/:id", protect, adminOnly, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
