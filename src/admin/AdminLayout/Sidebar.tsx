import { RxDashboard } from "react-icons/rx";
import { CgShoppingBag } from "react-icons/cg";
import { BiDollarCircle } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { adminLoggedOut } from "../../utils/features/Auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();

  function logoutAdmin() {
    dispatch(adminLoggedOut());
  }
  return (
    <div>
      <div className="drawer md:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content md:hidden flex">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side bg-base-200">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white text-lg w-80 p-8">
            <li className="pt-1 pb-1">
              <Link to='/admin'>
                <RxDashboard size={20} />
                Dashboard
              </Link>
            </li>
            <li className="pt-1 pb-1">
              <Link to='order'>
                <CgShoppingBag size={20} />
                Orders
              </Link>
            </li>
            <li className="pt-1 pb-1">
              <Link to='transaction'>
                <BiDollarCircle size={20} />
                Transactions
              </Link>
            </li>
            <li className="pt-1 pb-1">
              <Link to='add-product'>
                <FiShoppingCart size={20} />
                Add Products
              </Link>
            </li>
            <div className="logout mt-[60vh] text-center">
              <button onClick={() => logoutAdmin()} className="w-full text-myred hover:text-mywhite hover:bg-myred p-2 rounded-md ">Logout</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
