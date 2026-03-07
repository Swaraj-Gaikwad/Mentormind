import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_URL } from "../services/api"

function ProductDetails() {

    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {

        const fetchProduct = async () => {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()

            const found = data.find(p => p._id === id)
            setProduct(found)
        }

        fetchProduct()

    }, [id])

    if (!product) {
        return <p>Loading...</p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <img
                src={product.image}
                alt={product.name}
                className="rounded-xl"
            />

            <div>

                <h1 className="text-3xl font-semibold mb-4">
                    {product.name}
                </h1>

                <p className="text-gray-600 mb-4">
                    {product.description}
                </p>

                <div className="flex items-center gap-4 mb-4">

                    <p className="text-2xl font-bold">
                        ₹{product.price}
                    </p>

                    {product.stock > 0 ? (
                        <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                            In Stock
                        </span>
                    ) : (
                        <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                            Out of Stock
                        </span>
                    )}

                </div>

                <button
                    disabled={product.stock === 0}
                    className={`px-6 py-2 rounded-md text-white ${product.stock === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gray-900 hover:bg-black"
                        }`}
                >
                    Add to Cart
                </button>

            </div>

        </div>
    )
}

export default ProductDetails