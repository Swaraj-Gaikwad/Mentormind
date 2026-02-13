import { useState } from "react"
import { API_URL } from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()

        if (res.ok) {
            alert("Registered successfully. Please login.")
            navigate("/login")
        } else {
            alert(data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="w-full bg-gray-800 text-white py-2 rounded-md">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
