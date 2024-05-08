import { Link } from "react-router-dom"

import Button from "./Button"

function Navbar() {
    return (
        <>
            <div className="navbar mt-8">
                <div className="flex-1 ml-14">
                    <Link to="/home" className="btn btn-ghost text-xl bg-mygreen hover:bg-myyellow">PopShop.com</Link>
                </div>
                <div className="flex-none gap-6 mr-12">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-48 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg text-mynavy">8 Items</span>
                                <span className="text-mynavy">Subtotal: $999</span>
                                <Link to='/home/cart' className="card-actions w-full">
                                    <Button text="View cart"  color="myred" hover="myyellow"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="./images/winter2.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar