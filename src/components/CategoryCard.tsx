import React from 'react';
import { useRouter } from 'next/router'

interface CategoryCardProps {
    imageSrc: string;
    title: string;
    description: string;
    index: number;
    bg: string;
    to: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    imageSrc,
    title,
    description,
    index,
    bg,
    to
}) => {
    const router = useRouter();
    return (
        <article onClick={() => {
            router.push('/Products?categorySelected=' + to)
        }} className={`flex flex-col shadow-xl mx-auto max-w-sm ${bg} py-20 px-12 transform duration-500 hover:-translate-y-2 cursor-pointer max-h-190 rounded-md`}>
            <div className="min-h-62">
                <img className="mx-auto mb-3" src={imageSrc} alt="" />
            </div>
            <h1 className="font-extrabold text-6xl mt-15 mb-10 text-gray-800">{index < 9 ? `0${index + 1}.` : `${index + 1}.`}</h1>
            <h2 className="font-bold mb-5 text-gray-800">{title}</h2>
            <p className="text-sm leading-relaxed text-gray-700">{description}</p>
        </article>
    );
};

export default CategoryCard;
