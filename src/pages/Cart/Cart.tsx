import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/client'; // Ensure supabase client is properly configured
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// components
import Head from '../../components/Head';
import Button from '../../components/Button';
import QuantityButton from './QuantityButton';
import { RootState } from '../../utils/features/store';

export interface ITEM {
  id: string;
  desc: string;
  price: string;
  name: string;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<ITEM[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.auth.user.username);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const { data, error } = await supabase
          .from('Cart')
          .select('*')
          .eq('username', userName)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data && data.products) {
          setCartItems(data.products);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
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
                <div className="hidden md:block px-4 md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500 dark:text-gray-400">
                    Quantity
                  </h2>
                </div>
                <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500 dark:text-gray-400">
                    Subtotal
                  </h2>
                </div>
              </div>
              <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                {loading ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
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
                      <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                        <Skeleton height={32} width={64} />
                      </div>
                      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                        <Skeleton height={24} width={`50%`} />
                      </div>
                    </div>
                  ))
                ) : (
                  cartItems.map((item: ITEM) => (
                    <div key={item.id} className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
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
                              {item.name}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 ">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden px-4 lg:block lg:w-2/12">
                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                          ${item.price}
                        </p>
                      </div>
                      <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                        <QuantityButton />
                      </div>
                      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span>Apply Coupon</span>
                <input
                  type="text"
                  className="flex-1 px-8 py-4 font-normal placeholder-gray-300 border dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 dark:text-gray-400 dark:bg-gray-800 "
                  placeholder="x304k45"
                />
                <Button text="Apply" color="mygreen" hover="myyellow" />
                <Button text="Checkout" color="myyellow" hover="mygreen" onClick={() => { navigate('/home/shop/checkout') }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
