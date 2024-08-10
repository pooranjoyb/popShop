import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/client"; // Ensure supabase client is properly configured
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdDelete } from "react-icons/md"; // Import the delete icon

// components
import Head from "../../components/Head";
import Button from "../../components/Button";
import QuantityButton from "./QuantityButton";
import { RootState } from "../../utils/features/store";
import { toast } from "react-toastify";

export interface ITEM {
  id: string;
  desc: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
  size: string; 
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<ITEM[]>([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.auth.user.username);

  const staticCoupon = {
    name: "DISCOUNT10",
    discount: 10,
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const { data, error } = await supabase
          .from("Cart")
          .select("*")
          .eq("username", userName)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.products) {
          setCartItems(data.products);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userName) {
      fetchCartData();
    }
  }, [userName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = async (itemName: string, itemSize: string) => {
    try {
      const { data, error } = await supabase
        .from("Cart")
        .select("products")
        .eq("username", userName)
        .single();

      if (error) {
        throw error;
      }

      if (data && data.products) {
        const updatedProducts = data.products.filter(
          (item: ITEM) => !(item.name === itemName && item.size === itemSize)
        );

        const { error: updateError } = await supabase
          .from("Cart")
          .update({ products: updatedProducts })
          .eq("username", userName);

        if (updateError) {
          throw updateError;
        }
        toast.success("Item removed successfully");
        setCartItems(updatedProducts);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (
    itemName: string,
    newQuantity: number
  ) => {
    try {
      const updatedProducts = cartItems.map((item) => {
        if (item.name === itemName) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });

      const { error } = await supabase
        .from("Cart")
        .update({ products: updatedProducts })
        .eq("username", userName);

      if (error) {
        throw error;
      }

      setCartItems(updatedProducts);
    } catch (error) {
      console.error("Error updating quantity in cart:", error);
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === staticCoupon.name) {
      setDiscount(staticCoupon.discount);
      toast.success("Coupon applied successfully!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total - (total * discount) / 100;
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:py-12 flex justify-between items-center">
        <Head h1="Your" h2="Cart" />
      </div>

      {/* Cart Details */}
      <div className="justify-center flex-1 px-4 sm:py-6 mx-auto max-w-screen-xl lg:py-4 md:px-6">
        <div className="p-8 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-8 xl:mb-0">
              {cartItems.length === 0 ? (
                ""
              ) : (
                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                  <div className="w-full md:block hidden px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      Product name
                    </h2>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      Price
                    </h2>
                  </div>
                  <div className="hidden md:block px-4 md:w-1/6 lg:w-2/12">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      Quantity
                    </h2>
                  </div>
                  <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-2/12">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400 mr-36">
                      Subtotal
                    </h2>
                  </div>
                </div>
              )}

              <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8"
                      >
                        <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                          <div className="flex flex-wrap items-center -mx-4">
                            <div className="w-full px-4 mb-3 md:w-1/3">
                              <Skeleton height={96} />
                            </div>
                            <div className="w-2/3 px-4">
                              <Skeleton height={24} width={`80%`} />
                              <Skeleton height={20} width={`60%`} />
                            </div>
                          </div>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12">
                          <Skeleton height={24} width={`50%`} />
                        </div>
                        <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                          <Skeleton height={32} width={64} />
                        </div>
                        <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                          <Skeleton height={24} width={`50%`} />
                        </div>
                      </div>
                    ))
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-8 items-center flex flex-col justify-center w-full">
                    <img
                      src="https://i.pinimg.com/564x/92/8b/b3/928bb331a32654ba76a4fc84386f3851.jpg"
                      height={300}
                      width={300}
                      alt=""
                    />
                    <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                      Your cart is empty
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Start adding items to your cart from the shop.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item: ITEM) => (
                    <div
                      key={item.name + item.size} // Ensure unique key by combining name and size
                      className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8"
                    >
                      <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                        <div className="flex flex-wrap items-center -mx-4">
                          <div className="w-full px-4 mb-3 md:w-1/3">
                            <div className="w-full h-96 md:h-24 md:w-24">
                              <img
                                src={item.image}
                                alt=""
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="w-2/3 px-4">
                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                              {item.name} <span className="text-gray-500">({item.size})</span> {/* Display size */}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 ">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden px-4 lg:block lg:w-2/12">
                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                          ₹{item.price}
                        </p>
                      </div>
                      <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                        <QuantityButton
                          initialQuantity={item.quantity ? item.quantity : 1}
                          onUpdate={(newQuantity) =>
                            handleQuantityChange(item.name, newQuantity)
                          }
                        />
                      </div>
                      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 flex items-center justify-between">
                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                          ₹{item.quantity ? item.quantity * item.price : item.price}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.name, item.size)} // Pass size to handleRemoveItem
                          className="text-red-600 hover:text-red-800"
                        >
                          <MdDelete size={24} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length === 0 ? (
                ""
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <span>Apply Coupon</span>
                  <input
                    type="text"
                    className="flex-1 px-8 py-4 font-normal placeholder-gray-300 border dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 dark:text-gray-400 dark:bg-gray-800"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button text="Apply" color="mygreen" hover="myyellow" onClick={handleApplyCoupon} />
                  <Button
                    text="Checkout"
                    color="myyellow"
                    hover="mygreen"
                    onClick={() => {
                      navigate("/home/shop/checkout");
                    }}
                  />
                  <h2 className="text-xl font-bold">Total: ₹{calculateTotal().toFixed(2)}</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
