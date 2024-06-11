import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Slide, toast } from "react-toastify";
import { supabase } from '../utils/client'; // Ensure the correct path to your Supabase client
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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize.width;
}

function Floatingnav() {
  if (Screensize() > 1024) {
    return <Glassnav />;
  }
}

function Navbar() {
  const userName = useSelector((state: RootState) => state.auth.user?.username);
  const dispatch = useDispatch();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!userName) return;

    // Fetch initial cart items count
    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from('Cart')
        .select('products')
        .eq('username', userName);

      console.log("items in cart:  ", data);

      if (error) {
        console.error('Error fetching cart items:', error);
      } else {
        // Assuming products is an array within each row in the Cart table
        const totalItems = data.reduce((acc, item) => acc + item.products.length, 0);
        setItemsInCart(totalItems);
      }
    };

    fetchCartItems();

    const cartChannel = supabase
      .channel('cart_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Cart' }, (payload) => {
        console.log('Insert Change received!', payload);
        // Assuming payload.new.products is an array of the inserted products
        const productsCount = payload.new.products ? payload.new.products.length : 0;
        setItemsInCart((prevCount) => prevCount + productsCount);
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'Cart' }, (payload) => {
        console.log('Delete Change received!', payload);
        // Assuming payload.old.products is an array of the deleted products
        const productsCount = payload.old.products ? payload.old.products.length : 0;
        setItemsInCart((prevCount) => Math.max(0, prevCount - productsCount));
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Cart' }, (payload) => {
        console.log('Update Change received!', payload);
        // Fetch the latest cart items on update to ensure consistency
        fetchCartItems();
      })
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

  return (
    <>
      <div className="navbar flex justify-between">
        <div className="flex md:ml-16 ml-2">
          <Link to="/home">
            <img
              src="./logo.png"
              alt="PopShop Logo"
              className="md:w-36 w-20 duration-100"
            />
          </Link>
        </div>

        <div className="flex justify-center z-[100]">
          {Floatingnav()}
        </div>

        <div className="flex-none gap-6 md:mr-16 mr-2">
          <div className="dropdown dropdown-end">
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
              className="mt-3 z-[1] card card-compact dropdown-content w-32 bg-base-100 shadow-2xl"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-mynavy">{itemsInCart} Items</span>
                <span className="text-mynavy">Subtotal: $$999</span>
                <Link to="/home/shop/cart" className="card-actions w-full">
                  <Button text="View cart" color="myyellow" hover="mygreen" />
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
                <img src="/images/winter2.jpg" />
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
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch(logout());
                      toastNotification("Successfully Logged Out!!!");
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
