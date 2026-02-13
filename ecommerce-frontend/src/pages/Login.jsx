function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">

                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Sign in to your account
                </h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-6">
                    Don't have an account?{" "}
                    <span className="text-gray-800 font-medium cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login

