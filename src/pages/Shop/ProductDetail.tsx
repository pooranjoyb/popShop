import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// components
import Head from "../../components/Head";
import Button from "../../components/Button";
import { addItem } from "../../utils/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../utils/client";

export interface Data {
    id: string;
    name: string;
    image: string;
    price: number;
    desc: string;
    qauntity: number;
}

interface RatingItem {
    className: string;
    checked?: boolean;
}

interface CartItem {
    name: string;
    size: string;
    quantity: number;
}

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
    const [reviewText, setReviewText] = useState("");
    const [reviewImage, setReviewImage] = useState<string | null>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const navigate = useNavigate();

    const handleRatingChange = (index: number) => {
        setFilledStars(index / 2 + 0.5);
    };

    const handleSize = (sizeValue: string) => {
        setSize(sizeValue);
    };

    const { state } = useLocation();
    const data = state as Data;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchReviews();
    }, []);

    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.auth.user.username);
    
    const product = {
        id: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        desc: data.desc,
        quantity: data.qauntity || 1,
        ratings: 5,
        size, 
    };

    const addToCart = async () => {
        if (!size) { 
            toast.error('Please select a size');
            return;
        }
        try {
            const product = {
                id: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                desc: data.desc,
                quantity: data.qauntity || 1,
                ratings: 5,
                size, // Include size
            };
    
            // Attempt to fetch the user's cart
            const { data: userCart, error: fetchError } = await supabase
                .from('Cart')
                .select('*')
                .eq('username', userName)
                .single();
    
            if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "No such record" error
                console.error("Fetch error:", fetchError);
                throw fetchError;
            }
    
            console.log("Product to be added", product);
    
            if (userCart) {
                // Check if the product already exists in the cart
                const existingProductIndex = userCart.products.findIndex(
                (item: CartItem) => item.name === product.name && item.size === product.size
  );
    
                let updatedProducts;
                if (existingProductIndex !== -1) {
                    // If the product exists, increase its quantity
                    updatedProducts = [...userCart.products];
                    updatedProducts[existingProductIndex].quantity += product.quantity;
                } else {
                    // If the product does not exist, add it to the cart
                    updatedProducts = [...userCart.products, product];
                }
    
                const { error: updateError } = await supabase
                    .from('Cart')
                    .update({ products: updatedProducts })
                    .eq('username', userName);
    
                if (updateError) {
                    console.error("Update error:", updateError);
                    throw updateError;
                }
    
                console.log("Product added/updated in cart:", product);
                dispatch(addItem({ item: product }));
                toast.success('Product added to cart');
            } else {
                // If the cart does not exist, insert a new row
                const { error: insertError } = await supabase
                    .from('Cart')
                    .insert([
                        {
                            username: userName,
                            products: [product],
                        },
                    ]);
    
                if (insertError) {
                    console.error("Insert error:", insertError);
                    throw insertError;
                }
    
                console.log("Product added to cart:", product);
                dispatch(addItem({ item: product }));
                toast.success('Product added to cart');
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error('Error adding product to cart');
        }
    };

    // Function to handle review submission
    const handleReviewSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { error } = await supabase
                .from('Reviews')
                .insert([
                    {
                        username: userName,
                        product_id: data.id,
                        review_text: reviewText,
                        rating: filledStars,
                        image_url: reviewImage,
                    },
                ]);

            if (error) {
                console.error("Insert error:", error);
                throw error;
            }

            setReviewText("");
            setReviewImage(null);
            fetchReviews(); 
            toast.success('Review submitted');
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error('Error submitting review');
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setReviewImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const fetchReviews = async () => {
        try {
            const { data: reviewsData, error } = await supabase
                .from('Reviews')
                .select('*')

            if (error) {
                console.error("Fetch error:", error);
                throw error;
            }

            setReviews(reviewsData);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error('Error fetching reviews');
        }
    };
    
    return (
        <>
            <div className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center">
                <Head h1="Product" h2="Detail" />
            </div>

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
                                        <span>₹{data.price}</span>
                                        <span
                                            className="text-base font-normal text-gray-500 line-through dark:text-gray-400 ml-2">₹{data.price + 89}</span>
                                    </p>
                                    <p className="text-green-600 dark:text-green-300 ">7 in stock</p>
                                </div>
                                <div className="flex items-center mb-8">
                                    <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                        Size:</h2>
                                    <div className="flex flex-wrap -mx-2 -mb-2">
                                        {
                                            availableSizes.map((value) => (
                                                <button
                                                    key={value}
                                                    className={`py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400 ${value === size ? "bg-mygreen" : ""}`}
                                                    onClick={() => { handleSize(value) }}>
                                                    {value}
                                                </button>
                                            ))
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
                                <div className="flex flex-wrap items-center gap-10 ">
                                    <Button text="Add to Cart" color="mygreen" hover="myred" onClick={addToCart} />
                                    <Button text="Buy Now" color="mygreen" hover="myred" onClick={() => navigate('/buy', { state: { product } })} />
                                </div>
                                <div className="bg-gray-100 py-6 dark:bg-gray-800 mt-6">
                                    <div className="px-4 py-4">
                                        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-400 mb-4">Customer Reviews</h2>
                                        <form className="mb-4" onSubmit={handleReviewSubmit}>
                                            <textarea
                                                id="review"
                                                name="review"
                                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                                rows={3}
                                                placeholder="Write your review here..."
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                required
                                            ></textarea>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                accept="image/*"
                                                className="block w-full text-gray-700 dark:text-gray-300"
                                                onChange={handleImageChange}
                                            />
                                            <Button text="Submit Review" color="mygreen" hover="myred" onClick={() => toast.success('Review submitted')} />
                                        </form>
                                        {/* Display Reviews */}
<div className="mt-8">
    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
    <div className="w-full max-w-lg overflow-y-auto max-h-80"> {/* Set fixed width and make it scrollable */}
        {reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
        ) : (
            <ul className="space-y-6">
                {reviews.map((review) => (
                    <li key={review.id} className="p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <div className="flex items-center mr-2">
                                {/* Render stars based on rating */}
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-5 h-5 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'} dark:text-gray-500`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.08 3.317a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.08 3.316c.3.921-.755 1.688-1.54 1.118l-2.8-2.033a1 1 0 00-1.176 0l-2.8 2.033c-.785.57-1.84-.197-1.54-1.118l1.08-3.316a1 1 0 00-.364-1.118L2.97 8.744c-.784-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.08-3.317z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{review.rating} stars</span>
                        </div>
                        <p className="mb-4 text-gray-800 dark:text-gray-300">{review.review_text}</p>
                        {review.image_url && (
                            <img
                                src={review.image_url}
                                alt="Review"
                                className="max-w-xs mb-4 rounded-md"
                            />
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>- {review.username}</span>
                            <span>{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
</div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductDetail;
