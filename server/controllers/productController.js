const Product = require("../models/Product")


exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image } = req.body

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            image,
            createdBy: req.user?._id,
            updatedBy: req.user?._id
        })

        res.status(201).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        product.name = req.body.name || product.name
        product.description = req.body.description || product.description
        product.price = req.body.price || product.price
        product.stock = req.body.stock || product.stock
        product.category = req.body.category || product.category
        product.image = req.body.image || product.image
        product.updatedBy = req.user?._id

        await product.save()

        res.json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await product.deleteOne()

        res.json({ message: "Product deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}