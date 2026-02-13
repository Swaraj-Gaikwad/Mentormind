import Navbar from "../components/Navbar"

function Checkout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

                {/* Shipping Form */}
                <div className="flex-1 bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-6 text-gray-800">
                        Shipping Details
                    </h3>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="City"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Postal Code"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-80 bg-white p-6 rounded-lg border border-gray-200 h-fit">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Order Summary
                    </h3>

                    <div className="flex justify-between mb-4 text-gray-600">
                        <span>Total</span>
                        <span>$198.00</span>
                    </div>

                    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition">
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Checkout
