import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { API_URL } from "../services/api"

function UserOrders() {
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`${API_URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            setOrders(data)
        }

        fetchOrders()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto mt-10 space-y-4">
                <h2 className="text-xl font-semibold">My Orders</h2>

                {orders.map((order) => (
                    <div key={order._id} className="bg-white p-4 rounded border">
                        <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserOrders
