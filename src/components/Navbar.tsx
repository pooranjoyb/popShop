import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Slide, toast } from "react-toastify";
import { supabase } from "../utils/client"; // Ensure the correct path to your Supabase client
import { RootState } from "../utils/features/store";
import { logout } from "../utils/features/Auth/authSlice";
import Glassnav from "./Floating_Nav";
import Button from "./Button";

function Screensize() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize.width;
}

function Floatingnav() {
  if (Screensize() > 1024) {
    return <Glassnav />;
  }
}

interface USER {
  username: string;
  email: string;
  pass: string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  createdAt: string | null;
  profilepicture: string;
}

function Navbar() {
  const userName = useSelector((state: RootState) => state.auth.user?.username);
  const dispatch = useDispatch();
  const [items, setItems] = useState<any>();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [total, setTotal] = useState(0);
  const [userInfo, setUserInfo] = useState<USER>();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    if (!userName) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", userName);

      if (error) {
        console.error(error);
      } else {
        setUserInfo(data[0]);
        console.log(data[0]);
      }
    };

    fetchData();

    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from('Cart')
        .select('products')
        .eq('username', userName);

      console.log("items in cart:  ", data);
      setItems(data);

      if (error) {
        console.error('Error fetching cart items:', error);
      } else {
        const totalItems = data.reduce((acc, item) => acc + item.products.length, 0);
        setItemsInCart(totalItems);

        type Product = {
          price: number;
          quantity: number;
        };

        const subtotalAmount = data.reduce((acc, item) => {
          return acc + item.products.reduce((itemAcc: number, product: Product) => {
            const price = typeof product.price === 'number' ? product.price : 0;
            const quantity = typeof product.quantity === 'number' ? product.quantity : 0;
            console.log(price, quantity);
            return itemAcc + (price * quantity);
          }, 0);
        }, 0);

        setTotal(subtotalAmount);
      }
    };

    fetchCartItems();

    const cartChannel = supabase
      .channel("cart_updates")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Cart" },
        (payload) => {
          console.log("Insert Change received!", payload);
          const productsCount = payload.new.products
            ? payload.new.products.length
            : 0;
          setItemsInCart((prevCount) => prevCount + productsCount);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "Cart" },
        (payload) => {
          console.log("Delete Change received!", payload);
          const productsCount = payload.old.products
            ? payload.old.products.length
            : 0;
          setItemsInCart((prevCount) => Math.max(0, prevCount - productsCount));
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Cart" },
        (payload) => {
          console.log("Update Change received!", payload);
          fetchCartItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(cartChannel);
    };
  }, [userName]);

  const toastNotification = (message: string) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      transition: Slide,
    });
  };

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleToggleHamburgerMenu = () => {
    setShowHamburgerMenu((prev) => !prev);
  };

  return (
    <>
      <div className="navbar flex justify-between bg-base-100 p-4">
        <div className="flex md:ml-16 ml-2">
          <Link to="/home">
            <img
              src="/logo.png"
              alt="PopShop Logo"
              className="md:w-36 w-20 duration-100"
            />
          </Link>
        </div>

        <div className="hidden lg:flex justify-center z-[100]">{Floatingnav()}</div>

        <div className="flex-none gap-6 md:mr-16 mr-2">
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <MdOutlineShoppingCart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">
                  {itemsInCart}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] right-[2px] card card-compact dropdown-content w-[250px] sm:w-80 bg-base-100 shadow-2xl"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-mynavy">
                  {itemsInCart} Items.
                </span>
                {items &&
                  items[0]?.products
                    ?.slice(0, 3)
                    .map((_: any, index: number) => (
                      <div
                        key={`${_.name}-${index}`}
                        className="flex gap-3 mt-4"
                      >
                        <div className="w-20 h-16">
                          <img
                            src={_.image}
                            alt="product-image"
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold dark:text-gray-400">
                            {_.name}
                          </h4>
                          <p className="font-medium dark:text-gray-400">
                            Price: ₹{_.price}
                          </p>
                        </div>
                      </div>
                    ))}

                <span className="text-mynavy mt-3">
                  subtotal ₹{total}
                </span>

                <Link
                  to="/home/shop/cart"
                  className="card-actions w-full flex items-center justify-center mt-3"
                >
                  <Button text="View All" color="myyellow" hover="mygreen" />
                </Link>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={handleToggleMenu}
            >
              <div className="w-10 rounded-full">
                <img src={userInfo?.profilepicture ? userInfo.profilepicture : "/images/winter2.jpg"} />
              </div>
            </div>
            {showMenu && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52 shadow-2xl"
              >
                <li onClick={handleCloseMenu}>
                  <Link to={"/home/profile"} className="justify-between">
                    {`${userName}` || <p>Profile</p>}
                  </Link>
                </li>
                <li onClick={handleCloseMenu}>
                  <Link to={"/home/shop"}>{<p>Shop</p>}</Link>
                </li>
                <li onClick={handleCloseMenu}>
                  <Link to={"/home/shop/cart"}>{<p>Cart</p>}</Link>
                </li>
                <li onClick={handleCloseMenu}>
                  <Link to="/home/my-orders">{<p>My Orders</p>}</Link>
                </li>
                <li onClick={() => { 
                  dispatch(logout());
                  handleCloseMenu();
                  toastNotification("Logged out successfully!");
                }}>
                  <Link to={"/"}>{<p>Logout</p>}</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="lg:hidden">
            <button
              className="btn btn-ghost btn-circle"
              onClick={handleToggleHamburgerMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showHamburgerMenu && (
        <div className="lg:hidden bg-base-100 p-4 shadow-2xl absolute top-16 right-0 w-full">
          <ul className="menu menu-compact">
            <li>
              <Link to={"/home#Collections"} onClick={() => setShowHamburgerMenu(false)}>Collections</Link>
            </li>
            <li>
              <Link to={"/home#Products"} onClick={() => setShowHamburgerMenu(false)}>Product</Link>
            </li>
            <li>
              <Link to={"/home/contact"} onClick={() => setShowHamburgerMenu(false)}>Contact Us</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch(logout());
                  setShowHamburgerMenu(false);
                  toastNotification("Logged out successfully!");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
