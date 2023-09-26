import React from 'react'

interface Filter {
    category: string;
    setCategory: (category: string) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    categories: string[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Filters = ({ category, setCategory, sortBy, setSortBy, categories, open, setOpen }: Filter) => {
    return (
        <div className="min-w-[300px]">

            {/* md view */}
            <div className="">

                <button type="button"
                    className="md:hidden text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => { setOpen(!open) }}
                >Filters
                </button>

                {
                    open && (
                        <div className="absolute md:hidden bg-white text-gray-700 max-w-[300px] pb-10 shadow-2xl rounded-md overflow-hidden">
                            <div className="p-3 flex flex-col gap-2">
                                {/* title */}
                                <h2 className='font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap truncate' >Filters</h2>

                                {/* badge */}
                                {categories.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                                            {category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                                            {sortBy}
                                        </span>
                                    </div>
                                )}

                                <div className="mt-3">
                                    <select
                                        onChange={(e) => { setCategory(e.target.value) }}
                                        value={category}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value={''}>Choose Category</option>
                                        {categories.map((ele, i) => (
                                            <option key={i} value={ele}>{ele}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-3">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => { setSortBy(e.target.value) }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''  >Sort By</option>
                                        <option value='asc'>low to high</option>
                                        <option value='desc'>high to low</option>

                                    </select>
                                </div>

                                <button type="button"
                                    onClick={() => {
                                        setCategory('');
                                        setSortBy('');
                                    }}
                                    className="mt-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Reset</button>

                            </div>
                        </div>
                    )
                }




            </div>
            {/* laptop view */}
            <div className="md:block hidden bg-white text-gray-700 max-w-[300px] pb-10 shadow-lg rounded-md overflow-hidden">
                <div className="p-3 flex flex-col gap-2">
                    {/* title */}
                    <h2 className='font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap truncate' >Filters</h2>

                    {/* badge */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                                {category}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                                {sortBy}
                            </span>
                        </div>
                    )}

                    <div className="mt-3">
                        <select
                            onChange={(e) => { setCategory(e.target.value) }}
                            value={category}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={''} >Choose Category</option>
                            {categories.map((ele, i) => (
                                <option key={i} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>


                    <div className="mt-3">
                        <select
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='' >Sort By</option>
                            <option value='asc'>low to high</option>
                            <option value='desc'>high to low</option>

                        </select>
                    </div>


                    <button type="button"
                        onClick={() => {
                            setCategory('');
                            setSortBy('');
                        }}
                        className="mt-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Reset</button>
                </div>
            </div>
        </div >
    );
}

export default Filters