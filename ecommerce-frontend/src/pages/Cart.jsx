import Navbar from "../components/Navbar"

function Cart() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

                {/* Cart Items */}
                <div className="flex-1 space-y-6">

                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                                <div>
                                    <h4 className="text-gray-800 font-medium">
                                        Product Name
                                    </h4>
                                    <p className="text-gray-600">$99.00</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button className="px-3 py-1">-</button>
                                    <span className="px-4">1</span>
                                    <button className="px-3 py-1">+</button>
                                </div>

                                <button className="text-red-500 hover:text-red-600">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

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
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Cart
