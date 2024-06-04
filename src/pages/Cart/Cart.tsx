import { useEffect, useState } from "react";

// components
import Head from "../../components/Head";
import Button from "../../components/Button";
import QuantityButton from "./QuantityButton";

function Cart() {
  // State for managing quantity and price for each product
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "DSL Camera",
      price: 99.00,
      originalPrice: 1500,
      quantity: 1,
      imageUrl: "https://i.postimg.cc/kGjz3dpD/pexels-cottonbro-3296434.jpg"
    },
    {
      id: 2,
      name: "Picture frame",
      price: 99.00,
      originalPrice: 1500,
      quantity: 1,
      imageUrl: "https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
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

              {products.map((product) => (
                <div key={product.id} className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                      <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full px-4 mb-3 md:w-1/3">
                          <div className="w-full h-96 md:h-24 md:w-24">
                            <img
                              src={product.imageUrl}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-2/3 px-4">
                          <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                            {product.name}
                          </h2>
                          <p className="text-gray-500 dark:text-gray-400">
                            {product.name === "DSL Camera" ? "Picture frame" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                        ${product.price.toFixed(2)}
                      </p>
                      <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                      <QuantityButton
                        quantity={product.quantity}
                        increaseQuantity={() => increaseQuantity(product.id)}
                        decreaseQuantity={() => decreaseQuantity(product.id)}
                      />
                    </div>
                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                      <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                        ${(product.quantity * product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-4">
                <span className="">Apply Coupon</span>
                <input
                  type="text"
                  className="flex-1 px-8 py-4 font-normal placeholder-gray-300 border dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 dark:text-gray-400 dark:bg-gray-800"
                  placeholder="x304k45"
                />
                <Button text="Apply" color="mygreen" hover="myyellow" />
                <Button text="Checkout" color="myyellow" hover="mygreen" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
