function Profile() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="flex justify-center">

            <div className="w-full max-w-xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">

                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    My Account
                </h2>

                <div className="space-y-5">

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">Full Name</span>
                        <span className="font-medium text-gray-900">
                            {user?.name}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">Email Address</span>
                        <span className="font-medium text-gray-900">
                            {user?.email}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Role</span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${user?.role === "admin"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {user?.role}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Profile
