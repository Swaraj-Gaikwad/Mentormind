import { useEffect, useState } from "react"
import { API_URL } from "../services/api"

function AdminDashboard() {

    const [activeTab, setActiveTab] = useState("products")
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)

    const token = localStorage.getItem("token")

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        description: ""
    })

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        description: ""
    })

    // 📊 Dashboard Stats
    const totalProducts = products.length
    const totalOrders = orders.length
    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
    )

    const fetchProducts = async () => {
        const res = await fetch(`${API_URL}/products`)
        const data = await res.json()
        setProducts(data)
    }

    const fetchOrders = async () => {
        const res = await fetch(`${API_URL}/orders/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (res.ok) {
            const data = await res.json()
            setOrders(data)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchOrders()
    }, [])

    // CREATE PRODUCT
    const createProduct = async () => {

        await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        })

        setNewProduct({
            name: "",
            price: "",
            stock: "",
            category: "",
            image: "",
            description: ""
        })

        fetchProducts()
    }

    // DELETE PRODUCT
    const deleteProduct = async (id) => {

        await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        fetchProducts()
    }

    // UPDATE PRODUCT
    const updateProduct = async () => {

        await fetch(`${API_URL}/products/${editingProduct._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        setEditingProduct(null)
        fetchProducts()
    }

    const updateOrderStatus = async (id, status) => {

        await fetch(`${API_URL}/orders/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        })

        fetchOrders()
    }

    return (
        <div>

            <h1 className="text-3xl font-semibold mb-8 text-gray-900">
                Admin Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <h2 className="text-2xl font-semibold mt-2">{totalProducts}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <h2 className="text-2xl font-semibold mt-2">{totalOrders}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <h2 className="text-2xl font-semibold mt-2">₹{totalRevenue}</h2>
                </div>

            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">

                <button
                    onClick={() => setActiveTab("products")}
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "products"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Inventory
                </button>

                <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "orders"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Orders
                </button>

            </div>

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (

                <div className="space-y-8">

                    {/* ADD PRODUCT */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Add New Product
                        </h2>

                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, name: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, description: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                        />

                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, stock: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, category: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, image: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                        />

                        {newProduct.image && (
                            <img
                                src={newProduct.image}
                                alt=""
                                className="w-32 rounded"
                            />
                        )}

                        <button
                            onClick={createProduct}
                            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black"
                        >
                            Add Product
                        </button>

                    </div>

                    {/* PRODUCT LIST */}

                    {products.map((product) => (

                        <div
                            key={product._id}
                            className="bg-white p-6 rounded-xl border shadow-sm"
                        >

                            {editingProduct?._id === product._id ? (

                                <div className="space-y-3">

                                    <input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="border px-3 py-2 rounded-md w-full"
                                    />

                                    <input
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className="border px-3 py-2 rounded-md w-full"
                                    />

                                    <input
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        className="border px-3 py-2 rounded-md w-full"
                                    />

                                    <input
                                        value={formData.stock}
                                        onChange={(e) =>
                                            setFormData({ ...formData, stock: e.target.value })
                                        }
                                        className="border px-3 py-2 rounded-md w-full"
                                    />

                                    <input
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category: e.target.value })
                                        }
                                        className="border px-3 py-2 rounded-md w-full"
                                    />

                                    <input
                                        value={formData.image}
                                        onChange={(e) =>
                                            setFormData({ ...formData, image: e.target.value })
                                        }
                                        className="border px-3 py-2 rounded-md w-full"
                                    />

                                    <div className="flex gap-3">

                                        <button
                                            onClick={updateProduct}
                                            className="bg-green-600 text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditingProduct(null)}
                                            className="bg-gray-300 px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-semibold text-gray-900">
                                            {product.name}
                                        </h3>

                                        <p className="text-gray-600">
                                            ₹{product.price}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Stock: {product.stock}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            {product.description}
                                        </p>

                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt=""
                                                className="w-24 mt-3 rounded"
                                            />
                                        )}

                                    </div>

                                    <div className="flex gap-4">

                                        <button
                                            onClick={() => {
                                                setEditingProduct(product)
                                                setFormData(product)
                                            }}
                                            className="text-blue-600 font-medium"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="text-red-600 font-medium"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

            {/* ORDERS TAB */}

            {activeTab === "orders" && (

                <div className="space-y-6">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white p-6 rounded-xl border shadow-sm"
                        >

                            <p className="text-gray-700">
                                <strong>User:</strong> {order.user?.email}
                            </p>

                            <p className="text-gray-700">
                                <strong>Total:</strong> ₹{order.totalAmount}
                            </p>

                            <p className="text-gray-700 mb-4">
                                <strong>Status:</strong> {order.status}
                            </p>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => updateOrderStatus(order._id, "Shipped")}
                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    Mark Shipped
                                </button>

                                <button
                                    onClick={() => updateOrderStatus(order._id, "Delivered")}
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Mark Delivered
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    )
}

export default AdminDashboard