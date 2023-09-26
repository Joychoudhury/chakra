import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Alert from '../error/Alert';

type Product = {
    _id: string;
    title: string;
    offerPrice: number;
    orignalPrice: number;
    description: string;
    imageSrc: string;
    category: string;
};

const Slug = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState({
        type: "",
        message: '',
        visibility: false,
    });

    const handleAddToCart = async (id: string) => {
        try {
            const cartUri = 'http://localhost:3000/api/cart';
            if (status !== 'authenticated' || session == null) {
                setError({
                    type: 'danger',
                    message: 'Please Login first',
                    visibility: true,
                });
                setTimeout(() => {
                    setError({
                        type: "",
                        message: '',
                        visibility: false,
                    });
                }, 2500);
                return; // Exit the function if not authenticated
            }

            const email = session?.user.email;
            const cartResponse = await axios.post(cartUri, { email, id });

            // Handle success here if needed
            setError({
                type: "",
                message: 'Product added to cart',
                visibility: true,
            });
            setTimeout(() => {
                setError({
                    type: "",
                    message: '',
                    visibility: false,
                });
            }, 2500);
            
        } catch (err) {
            console.error('Error adding product to cart:', err);
            setError({
                type: "danger",
                message: 'Error adding product to cart',
                visibility: true,
            });
            setTimeout(() => {
                setError({
                    type: "",
                    message: '',
                    visibility: false,
                });
            }, 2500);
        }
    };

    useEffect(() => {
        if (router.query.slug) {
            axios.get(`http://localhost:3000/api/product/${router.query.slug}`).then((res) => {
                setProduct(res.data);
            });
        }
    }, []);

    if (!product) {
        return <>...Loading...</>;
    }

    const discountPercentage = Math.floor((product.offerPrice * 0.2) / product.offerPrice * 100);
    const {type,visibility,message} = error;
    return (
        <div className="">
            <Navbar />
            {visibility && <Alert type={type} message={message} />}

            <div className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-3 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 max-w-full object-cover object-center rounded border border-gray-200" src={product.imageSrc} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-3 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-5">{product.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-10">{product.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-2 text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-2 text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed my-20">{product.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-10">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">₹{product.offerPrice}</span>
                                <span className='title-font font-medium text line-through text-gray-900 mx-4'>₹{product.orignalPrice}</span>

                                <span className='bg-green-400 px-1.5 py-1 rounded-md text-lg text-white'>save {discountPercentage}%</span>

                                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                    onClick={() => { handleAddToCart(product._id) }}
                                >
                                    Add to cart
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Slug