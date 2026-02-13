import { useEffect, useState } from "react"
import { API_URL } from "../services/api"

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("products")
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: ""
    })

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: ""
    })

    const token = localStorage.getItem("token")

    // Fetch Products
    const fetchProducts = async () => {
        const res = await fetch(`${API_URL}/products`)
        const data = await res.json()
        setProducts(data)
    }

    // Fetch Orders (Admin)
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
            image: ""
        })

        fetchProducts()
    }

    const deleteProduct = async (id) => {
        await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        fetchProducts()
    }

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
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button onClick={() => setActiveTab("products")} className="px-4 py-2 bg-gray-800 text-white rounded">
                    Inventory
                </button>
                <button onClick={() => setActiveTab("orders")} className="px-4 py-2 bg-gray-800 text-white rounded">
                    Orders
                </button>
            </div>

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
                <div className="space-y-6">

                    {/* Add Product Form */}
                    <div className="bg-white p-4 rounded border space-y-3">
                        <h2 className="font-semibold text-lg">Add New Product</h2>

                        <input
                            type="text"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />

                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />

                        <button onClick={createProduct} className="px-4 py-2 bg-gray-800 text-white rounded">
                            Add Product
                        </button>
                    </div>

                    {/* Product List */}
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-4 rounded border">

                            {editingProduct?._id === product._id ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />

                                    <button onClick={updateProduct} className="px-3 py-1 bg-green-600 text-white rounded">
                                        Save
                                    </button>

                                    <button onClick={() => setEditingProduct(null)} className="ml-2 text-gray-600">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p>₹{product.price}</p>
                                        <p>Stock: {product.stock}</p>
                                        {product.image && (
                                            <img src={product.image} alt="" className="w-24 mt-2" />
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setEditingProduct(product)
                                                setFormData(product)
                                            }}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="text-red-600"
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
                <div className="space-y-4">

                    {orders.length === 0 && (
                        <p>No orders found</p>
                    )}

                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-4 rounded border">
                            <p><strong>User:</strong> {order.user?.email}</p>
                            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                            <p><strong>Status:</strong> {order.status}</p>

                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => updateOrderStatus(order._id, "Shipped")}
                                    className="px-3 py-1 bg-blue-600 text-white rounded"
                                >
                                    Mark Shipped
                                </button>

                                <button
                                    onClick={() => updateOrderStatus(order._id, "Delivered")}
                                    className="px-3 py-1 bg-green-600 text-white rounded"
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

