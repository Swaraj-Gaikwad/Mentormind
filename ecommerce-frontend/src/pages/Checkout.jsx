import { useState } from "react"
import { API_URL } from "../services/api"
import { useNavigate } from "react-router-dom"

function Checkout() {
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const placeOrder = async () => {
        const token = localStorage.getItem("token")

        const res = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                shippingAddress: address
            })
        })

        const data = await res.json()

        if (res.ok) {
            // redirect to success page
            navigate("/success")
        } else {
            alert(data.message)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-lg mx-auto">

                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                    Checkout
                </h2>

                <h3 className="text-md font-medium mb-3 text-gray-700">
                    Shipping Address
                </h3>

                <input
                    type="text"
                    placeholder="Enter your shipping address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button
                    onClick={placeOrder}
                    className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-black transition"
                >
                    Place Order (Cash on Delivery)
                </button>

            </div>

        </div>
    )
}

export default Checkout