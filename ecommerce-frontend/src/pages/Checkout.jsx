import { useState } from "react"
import Navbar from "../components/Navbar"
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
            alert("Order placed successfully!")
            navigate("/")
        } else {
            alert(data.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-lg mx-auto">

                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Shipping Address
                    </h3>

                    <input
                        type="text"
                        placeholder="Enter shipping address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button
                        onClick={placeOrder}
                        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
                    >
                        Place Order (Cash on Delivery)
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Checkout

