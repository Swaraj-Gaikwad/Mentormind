import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { API_URL } from "../services/api"
import { useNavigate } from "react-router-dom"

function Cart() {
    const [cart, setCart] = useState({ items: [], totalAmount: 0 })
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const fetchCart = async () => {
        const res = await fetch(`${API_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()
        setCart(data)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const updateQuantity = async (productId, newQuantity) => {
        await fetch(`${API_URL}/cart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId,
                quantity: newQuantity
            })
        })

        fetchCart()
    }

    const removeItem = async (productId) => {
        updateQuantity(productId, 0)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

                {/* Cart Items */}
                <div className="flex-1 space-y-6">

                    {cart.items.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.items.map((item) => (
                            <div
                                key={item.product._id}
                                className="bg-white p-6 rounded-lg border border-gray-200 flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="text-gray-800 font-medium">
                                        {item.product.name}
                                    </h4>
                                    <p className="text-gray-600">
                                        ₹{item.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product._id, item.quantity - 1)
                                            }
                                            className="px-3 py-1"
                                        >
                                            -
                                        </button>

                                        <span className="px-4">{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product._id, item.quantity + 1)
                                            }
                                            className="px-3 py-1"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.product._id)}
                                        className="text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                </div>

                {/* Order Summary */}
                <div className="w-80 bg-white p-6 rounded-lg border border-gray-200 h-fit">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Order Summary
                    </h3>

                    <div className="flex justify-between mb-4 text-gray-600">
                        <span>Total</span>
                        <span>₹{cart.totalAmount}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Cart


