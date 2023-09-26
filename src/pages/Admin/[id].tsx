import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'



const AdminEditProduct = () => {
    const router = useRouter();
    const { id } = router.query;

    const [productData, setProductData] = useState({
        title: '',
        description: '',
        offerPrice: 0,
        originalPrice: 0,
        category: '',
        imageSrc: ''
    });

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://joy-chakra-deploy.vercel.app/api/admin/product/${id}`);
            setProductData(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleEditProduct = async () => {
        try {
            const response = await axios.put(`https://joy-chakra-deploy.vercel.app/api/admin/product/${id}`, productData);
            console.log(response);
            router.push('/Admin');
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    if (productData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-xl mt-10 shadow-lg p-5 rounded-xl bg-gray-100 mx-auto p-4">
            <h2 className="text-2xl my-2 text-center font-bold text-2xl font-semibold mb-4">Edit Product</h2>
            <div className="space-y-4">
                {productData && (
                    <>
                        <input
                            type="text"
                            name="title"
                            value={productData.title}
                            onChange={handleInputChange}
                            placeholder="Product Title"
                            className="w-full border p-2 rounded"
                        />
                        <div className="flex gap-3">
                            <input
                                type="number"
                                name="offerPrice"
                                value={productData.offerPrice}
                                onChange={handleInputChange}
                                placeholder="Offer Price"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="number"
                                name="originalPrice"
                                value={productData.originalPrice}
                                onChange={handleInputChange}
                                placeholder="Original Price"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <input
                            type="text"
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="imageSrc"
                            value={productData.imageSrc}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            placeholder="Category"
                            className="w-full border p-2 rounded"
                        />
                        <button
                            onClick={handleEditProduct}
                            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminEditProduct;
