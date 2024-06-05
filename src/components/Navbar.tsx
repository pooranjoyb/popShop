import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingCart } from "react-icons/md";

import Glassnav from "./Floating_Nav";
import Button from "./Button";
import { RootState } from "../utils/features/store";
import { logout } from "../utils/features/Auth/authSlice";
import { Slide, toast } from "react-toastify";


function Screensize() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth});

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth});
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    windowSize.width
  )
}
function Floatingnav(){
  if(Screensize() > 1024){
    return(
      <Glassnav/>
    )
  }
}
function Navbar() {
  const userName = useSelector((state: RootState) => state.auth.user?.username);
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state: RootState) => state.cart.item).length;

  const [showMenu, setShowMenu] = useState(false);

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
          <Link to="/">
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
                <span className="badge badge-sm indicator-item ">
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
                <Link to="/shop/cart" className="card-actions w-full">
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
                  <Link to={"/profile"} className="justify-between">
                    {`${userName}` || <p>Profile</p>}
                  </Link>
                </li>
                <li onClick={handleCloseMenu}>
                  <Link to={"/shop"}>{<p>Shop</p>}</Link>
                </li>
                <li onClick={handleCloseMenu}>
                  <Link to={"/shop/cart"}>{<p>Cart</p>}</Link>
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
