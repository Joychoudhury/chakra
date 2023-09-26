import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


interface Product {
    _id: string;
    imageSrc: string;
    offerPrice: number;
    originalPrice: number;
    title: string;
    description: string;
    category: string;

    // Add other properties here
}

const AdminEditProducts = () => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/admin/product');
            setProducts(response.data as Product[]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete('http://localhost:3000/api/admin/product/' + id);
            console.log(response)
            // setProducts(response.data);
            fetchProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Product Management</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden"
                    >
                        <img src={product.imageSrc} alt="Product" className="w-full h-48 object-cover"
                            onClick={() => router.push(`Admin/${product._id}`)}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                            <div className="text-xs bg-gray-200 p-1 rounded-lg inline text-gray-600 mb-2">{product.category}</div>
                            <div className="flex justify-between items-center">
                                <div className="text-lg text-indigo-600 font-semibold mt-2">₹{product.originalPrice}</div>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEditProducts;
