import Navbar from "../components/Navbar"

function Catalogue() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

                {/* Sidebar */}
                <aside className="w-64 bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Categories
                    </h3>

                    <ul className="space-y-3 text-gray-600">
                        <li className="cursor-pointer hover:text-gray-900">Electronics</li>
                        <li className="cursor-pointer hover:text-gray-900">Clothing</li>
                        <li className="cursor-pointer hover:text-gray-900">Accessories</li>
                        <li className="cursor-pointer hover:text-gray-900">Home</li>
                    </ul>
                </aside>

                {/* Product Grid */}
                <main className="flex-1 grid grid-cols-3 gap-6">

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition"
                        >
                            <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                            <h4 className="text-gray-800 font-medium mb-2">
                                Product Name
                            </h4>
                            <p className="text-gray-600 mb-3">
                                $99.00
                            </p>
                            <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition">
                                Add to Cart
                            </button>
                        </div>
                    ))}

                </main>
            </div>
        </div>
    )
}

export default Catalogue
