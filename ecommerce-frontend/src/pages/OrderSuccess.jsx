import { Link } from "react-router-dom"

function OrderSuccess() {
    return (
        <div className="text-center py-20">

            <h1 className="text-4xl font-semibold mb-4 text-green-600">
                Order Placed Successfully 🎉
            </h1>

            <p className="text-gray-600 mb-8">
                Thank you for your purchase. Your order has been placed successfully.
            </p>

            <Link
                to="/orders"
                className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-black"
            >
                View My Orders
            </Link>

        </div>
    )
}

export default OrderSuccess