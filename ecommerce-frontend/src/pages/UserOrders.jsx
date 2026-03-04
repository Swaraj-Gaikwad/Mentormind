import { useEffect, useState } from "react"
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

    const getStatusColor = (status) => {
        switch (status) {
            case "Shipped":
                return "bg-green-100 text-green-700"
            case "Pending":
                return "bg-yellow-100 text-yellow-700"
            case "Cancelled":
                return "bg-red-100 text-red-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-8 text-gray-900">
                My Orders
            </h2>

            {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border text-gray-600 text-center shadow-sm">
                    No orders placed yet.
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                        >
                            {/* Top Section */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                        Order ID
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {order._id.slice(-6).toUpperCase()}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <span
                                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="space-y-3 mb-6">
                                {order.items.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className="flex justify-between text-gray-700"
                                    >
                                        <span>
                                            {item.product.name} × {item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            ₹{item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-800">
                                    Total
                                </span>
                                <span className="text-lg font-bold text-gray-900">
                                    ₹{order.totalAmount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserOrders
