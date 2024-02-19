import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

// components
import Head from "../components/Head";
import Footer from "../components/Footer";
import Button from "../components/Button";

interface Data {
    name: string;
    image: string;
    price: number;
    desc: string;
}

function ProductDetail() {
    const { state } = useLocation();
    const data = state as Data;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center">
                <Head h1="Product" h2="Detail" />
            </div>

            {/* Product Details */}

            <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 md:w-1/2 ">
                            <div className="sticky top-0 z-50 overflow-hidden ">
                                <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                    <img src={data.image} alt=""
                                        className="object-cover w-full lg:h-full " />
                                </div>

                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 ">
                            <div className="lg:pl-20">
                                <div className="mb-8 ">
                                    <span className="text-lg font-medium text-rose-500 dark:text-rose-200">Buy Today</span>
                                    <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                        {data.name}
                                    </h2>

                                    <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                        {data.desc}
                                    </p>
                                    <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                        <span>${data.price}</span>
                                        <span
                                            className="text-base font-normal text-gray-500 line-through dark:text-gray-400 ml-2">${data.price + 89}</span>
                                    </p>
                                    <p className="text-green-600 dark:text-green-300 ">7 in stock</p>
                                </div>
                                <div className="flex items-center mb-8">
                                    <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                        Size:</h2>
                                    <div className="flex flex-wrap -mx-2 -mb-2">
                                        <button
                                            className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                        </button>
                                        <button
                                            className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                        </button>
                                        <button
                                            className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                        </button>
                                        <button
                                            className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                        </button>
                                    </div>
                                </div>
                                <div className="w-32 mb-8 ">
                                    <label htmlFor=""
                                        className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Quantity</label>
                                    <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                        <button
                                            className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                            <span className="m-auto text-2xl font-thin">-</span>
                                        </button>
                                        <input type="number"
                                            className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                            placeholder="1" />
                                        <button
                                            className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                            <span className="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-10 ">
                                    
                                        <Button text="Add to Cart" color="mygreen" hover="myred" />
                                        <Button text="Buy Now" color="myyellow" hover="myred" />
                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    )
}

export default ProductDetail