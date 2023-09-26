// components/AdminPanel.tsx

import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [productData, setProductData] = useState({
        title: '',
        offerPrice: 0,
        originalPrice: 0,
        description: '',
        imageSrc: '',
        category: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleAddProduct = async () => {
        try {
            console.log(productData);
            const response = await axios.post('/api/admin/product', productData);
            setProductData({
                title: '',
                originalPrice: 0,
                offerPrice: 0,
                description: '',
                imageSrc: '',
                category: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="max-w-xl mt-10 shadow-lg p-5 rounded-xl bg-gray-100 mx-auto p-4">
            <h2 className="text-2xl my-2 text-center font-bold text-2xl font-semibold mb-4">
                Add New Product
            </h2>
            <div className="space-y-4">
                <div className="mb-2">
                    <label htmlFor="title" className="block font-semibold">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={productData.title}
                        onChange={(e) => { handleInputChange(e) }}
                        placeholder="Product Title"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="flex gap-3">
                    <div className="flex-1 mb-2">
                        <label htmlFor="price" className="block font-semibold">
                            Price
                        </label>
                        <input
                            type="number"
                            name="originalPrice"
                            id="price"
                            value={productData.originalPrice}
                            onChange={(e) => { handleInputChange(e) }}
                            placeholder="Price"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex-1 mb-2">
                        <label htmlFor="discountedPrice" className="block font-semibold">
                            Discounted Price
                        </label>
                        <input
                            type="number"
                            name="offerPrice"
                            id="discountedPrice"
                            value={productData.offerPrice}
                            onChange={(e) => { handleInputChange(e) }}
                            placeholder="Discounted Price"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="block font-semibold">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={productData.description}
                        onChange={(e) => { handleInputChange(e) }}
                        placeholder="Description"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="imageSrc" className="block font-semibold">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageSrc"
                        id="imageSrc"
                        value={productData.imageSrc}
                        onChange={(e) => { handleInputChange(e) }}
                        placeholder="Image URL"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="category" className="block font-semibold">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={productData.category}
                        onChange={(e) => { handleInputChange(e) }}
                        placeholder="Category"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 cursor-pointer"
                >
                    Add Product
                </button>
            </div>
        </div>
    );

};

export default AdminPanel;
