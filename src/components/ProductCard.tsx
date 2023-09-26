import React from 'react'
import { useRouter } from 'next/router'

import star from '../../public/star.png'
import heart from '../../public/heart.png'
import eye from '../../public/eye.png'

type card = {
    imgSrc: string;
    category: string;
    title: string;
    offerPrice: number;
    originalPrice: number;
    id: string;
    addToCart: (id: string) => void
}

const ProductCard = ({ imgSrc, category, title, offerPrice, originalPrice, id, addToCart }: card) => {

    const router = useRouter();

    const discountPercentage = Math.floor((originalPrice - offerPrice) / originalPrice * 100);


    return (
        <div className="bg-white text-gray-700 max-w-[150px] md:max-w-[256px] min-h-[10rem] shadow-lg rounded-md overflow-hidden">
            <img className="max-w-full max-h-full object-cover " src={imgSrc} alt="" />
            <div className="p-3 flex flex-col gap-2">

                {/* badge */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className='px-3 py-1 rounded-full text-xs bg-gray-100'>{category}</span>
                </div>
                {/* title */}
                <h2 className='font-semibold text-lg overflow-ellipsis overflow-hidden whitespace-nowrap truncate' title={title}>{title}</h2>
                {/* price */}
                <span className="text-base font-bold">₹{offerPrice}</span>
                <div className="flex  items-center gap-2">
                    <span className='text-xs line-through opacity-50'>₹{originalPrice}</span>
                    <span className='bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white'>save {discountPercentage}%</span>
                </div>

                {/* rating */}

                <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <img key={index} className="h-4" src={star.src} alt="" />
                    ))}
                    <span className='text-xs ml-2 text-gray-500'>1K reviews</span>
                </span>

                {/* add to cart */}
                <div className="flex gap-2">
                    <button className="sm:text-sm text-xs bg-yellow-500/80 hover:bg-yellow-500/90 sm:px-3 px-1 py-1  rounded-md text-white tracking-wider transition"
                        onClick={() => { addToCart(id) }}
                    >Add to Cart</button>
                    {/* <button className='flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/90 transition rounded-md '>
                        <img className='opacity-50 max-h-3 ' src={heart.src} alt="" />
                    </button> */}
                    <button className='flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/90 transition rounded-md '
                        onClick={() => {
                            router.push(`/Products/${id}`)
                        }}
                    >
                        <img className='opacity-50 max-h-5' src={eye.src} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard