function Hero() {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl p-10 mb-10 flex justify-between items-center">

            <div className="max-w-xl">
                <h1 className="text-4xl font-bold mb-4">
                    Discover the Best Products
                </h1>

                <p className="text-gray-200 mb-6">
                    Shop the latest electronics, fashion, and accessories at unbeatable prices.
                </p>

                <button className="bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                    Shop Now
                </button>
            </div>

            <div className="hidden md:block">
                <img
                    src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
                    alt="shopping"
                    className="h-48 rounded-lg"
                />
            </div>

        </div>
    )
}

export default Hero