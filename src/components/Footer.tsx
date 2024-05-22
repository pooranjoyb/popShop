import { Link } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";


function Footer() {
  return (
    <>
      <footer 
      
      className="text-mynavy mx-auto flex-col sm:flex-row max-w-screen-xl px-4 py-12 flex justify-center items-center bg-white lg:grid lg:grid-cols-5 ">
        <div className="lg:col-span-2 h-full p-2 sm:p-0">
          <img
            src="./images/footer.jpg"
            alt=""
            className=" h-full w-full object-cover"
          />
        </div>

        <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <div className="text-4xl font-extrabold">
                Call Us <br />
                <span
                  style={{
                    textShadow:
                      "-1px -1px 0 #000, 5px -1px 0 #073B4C, -1px 1px 0 #073B4C, 5px 1px 0 #073B4C",
                    color: "#fff",
                  }}
                >
                  {" "}
                  123456789{" "}
                </span>
              </div>

              <ul className="mt-8 space-y-1 text-sm text-gray-700">
                <li>Monday to Friday: 10am - 5pm</li>
                <li>Weekend: 10am - 3pm</li>
              </ul>

              <ul className="mt-8 flex gap-6">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Facebook</span>

                    <FaFacebook className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Instagram</span>
                    <IoLogoInstagram className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Twitter</span>

                    <RiTwitterXFill className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/pooranjoyb/popShop"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="w-6 h-6" />
                  </a>
                </li>

              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div>
                <p className="font-medium text-gray-900">Services</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      to="/home/profile"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Profile{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/cart"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      View Cart{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/shop"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Order Now
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Join Us{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#about"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a className="text-gray-500 transition hover:opacity-75">
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:opacity-75">
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:opacity-75">
                    {" "}
                    Cookies{" "}
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                &copy; 2024. PopShop.com. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
