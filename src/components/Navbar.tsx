import {Link, NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {MdOutlineShoppingCart} from "react-icons/md";

import Button from "./Button"
import {RootState} from "../utils/features/store";
import {logout} from "../utils/features/Auth/authSlice";
import {Slide, toast} from "react-toastify";

function Navbar() {
  const userName = useSelector((state: RootState) => state.auth.user?.username);



    const dispatch = useDispatch();

    const toastNotification = (message:string) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
            transition: Slide,
        })
    };

    return ( <> 
       <div className="navbar mt-8">
        <div className="flex-1 ml-14">
            <Link to="/home" className="btn btn-ghost text-xl bg-mygreen hover:bg-myyellow">PopShop.com</Link>
        </div>
        <div className="flex-none gap-6 mr-12">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <MdOutlineShoppingCart className="h-5 w-5"/>
                        <span className="badge badge-sm indicator-item">8</span>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-48 bg-base-100 shadow">
                    <div className="card-body">
                        <span className="font-bold text-lg text-mynavy">8 Items</span>
                        <span className="text-mynavy">Subtotal: $999</span>
                        <Link to='/cart' className="card-actions w-full">
                            <Button text="View cart" color="myred" hover="myyellow"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="./images/winter2.jpg"/>
                    </div>
                </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to={"/home/profile"} className="justify-between">
                    {userName || <p>Profile</p>}
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => {
                      dispatch(logout());
                      toastNotification("Successfully Logged Out!!!");
                    }}
                    end
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
          </div>
        </div>
    </div> 
    </>
    )
}

export default Navbar;
