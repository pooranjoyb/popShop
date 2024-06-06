import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Head from "../../components/Head";
import Button from "../../components/Button";
import QuantityButton from "../Cart/QuantityButton";
import { addItem } from "../../utils/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../utils/client";

export interface Data {
    name: string;
    image: string;
    price: number;
    desc: string;
}

interface RatingItem {
    className: string;
    checked?: boolean;
}
// src/types.ts
export interface UserState {
    user: {
      username: string;
    };
  }
  
  export interface RootState {
    auth: UserState;
  }
  
  

const commonClasses = "mask mask-star-2";

const ratingItems: RatingItem[] = [
    { className: `${commonClasses} mask-half-1` },
    { className: `${commonClasses} mask-half-2` },
    { className: `${commonClasses} mask-half-1` },
    { className: `${commonClasses} mask-half-2` },
    { className: `${commonClasses} mask-half-1` },
    { className: `${commonClasses} mask-half-2` },
    { className: `${commonClasses} mask-half-1` },
    { className: `${commonClasses} mask-half-2` },
    { className: `${commonClasses} mask-half-1` },
    { className: `${commonClasses} mask-half-2` },
];


function ProductDetail() {
    const [filledStars, setFilledStars] = useState(0);
    const availableSizes = ["XS", "S", "M", "L", "XL"];
    const [size, setSize] = useState("");

    const handleRatingChange = (index: number) => {
        setFilledStars(index / 2 + 0.5);
    };
    const handleSize = (sizeValue: string) => {
        setSize(sizeValue)
    };
    const { state } = useLocation();
    const data = state as Data;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.auth.user.username);
    const addToCart = async () => {
        try {
            const product = {
                name: data.name,
                image: data.image,
                price: data.price,
                desc: data.desc,
                quantity: 1, // assuming quantity as 1, replace with actual quantity
                ratings: 5, // assuming ratings as 5, replace with actual ratings
            };

            const { error } = await supabase
                .from("Cart")
                .insert([
                    {
                        username: userName, // replace with actual username
                        products: [product],
                    },
                ]);

            if (error) throw error;
            console.log("Product added to cart:", product);

            // Dispatch to Redux
            dispatch(addItem({ item: product }));
            toast.success('Product added to cart');
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    return (
        <>
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
                                        {
                                            availableSizes.map((value) => {
                                                return (
                                                    <button
                                                        className={`py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400 ${value==size?"bg-mygreen":""}`} onClick={() => { handleSize(value) }}>{value}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="rating rating-sm rating-half mb-8 items-center">
                                    <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                        Rating:
                                    </h2>
                                    <input
                                        type="radio"
                                        name="rating-10"
                                        className="rating-hidden"
                                        readOnly
                                        onChange={() => handleRatingChange(-1)}
                                        defaultChecked
                                    />
                                    {ratingItems.map((item, index) => (
                                        <input
                                            key={index}
                                            type="radio"
                                            name="rating-10"
                                            className={item.className}
                                            onChange={() => handleRatingChange(index)}
                                            readOnly
                                        />
                                    ))}
                                    <span className="ml-2">{`${filledStars} out of 5 `}
                                    </span>

                                </div>

                                <div className="w-32 mb-8 ">
                                    <label htmlFor=""
                                        className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Quantity</label>
                                    <QuantityButton />
                                </div>
                                <div className="flex flex-wrap items-center gap-10 ">

                                    <Button text="Add to Cart" color="mygreen" hover="myred" onClick={addToCart} />
                                    <Button text="Buy Now" color="myyellow" hover="myred" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductDetail