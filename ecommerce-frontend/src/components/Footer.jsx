function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">


                <div>
                    <h2 className="text-white text-xl font-semibold mb-3">
                        ShopEase
                    </h2>
                    <p className="text-gray-400 text-sm">
                        A modern e-commerce platform built with the MERN stack.
                        Discover quality products with a seamless shopping experience.
                    </p>
                </div>


                <div>
                    <h3 className="text-white font-medium mb-3">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Cart</li>
                        <li className="hover:text-white cursor-pointer">Orders</li>
                        <li className="hover:text-white cursor-pointer">Profile</li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-white font-medium mb-3">
                        Contact
                    </h3>

                    <p className="text-sm text-gray-400">
                        Pune, Maharashtra, India
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                        support@shopease.com
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                        +91 0000 00000
                    </p>
                </div>

            </div>


            <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} ShopEase. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer