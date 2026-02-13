const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
                price: Number,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Shipped", "Delivered"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            default: "Cash on Delivery",
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)
