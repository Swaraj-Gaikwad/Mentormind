import Navbar from "../components/Navbar"

function Profile() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded border">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>

                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
            </div>
        </div>
    )
}

export default Profile
