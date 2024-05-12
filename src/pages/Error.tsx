//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "../components/Head";

function Error() {
  return (
    <>
      <Navbar />

      {/* Hero  */}
      <div className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center">
        <div className="max-w-xl ">
          <div className="text-mynavy">
            <Head h1="404 Not Found" h2="Error! :(" />
          </div>
        </div>
        <img className="w-1/3" src="./images/hero.png" alt="" />
      </div>

      {/* Footer  */}

      <Footer />
     
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">USEFUL LINKS</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Legal & Privacy</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Contact</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Gift Card</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Customer Service</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">TOP CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Headphones</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Laptops</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Accessories</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Televisions</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">MY ACCOUNT</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">My Profile</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">My Order History</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">My Wish List</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-pink-500 cursor-pointer">Shopping Cart</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Newsletter</h2>
              <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                  <input type="text" id="footer-field" name="footer-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Subscribe</button>
              </div>
              <p className="text-gray-500 text-sm mt-2 md:text-left text-center">Enter your email to receive 
                <br className="lg:block hidden"/>our latest updates about our products.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200">
          <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="ml-3 text-2xl text-pink-500">PopShop</span>
            </a>
            <p className="text-sm text-gray-600 sm:ml-6 sm:mt-0 mt-4">© 2024 PopShops.
              <a className="text-gray-600 ml-1" target="_blank">All Rights Reserved.</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="text-gray-500 hover:text-pink-500 cursor-pointer">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-pink-500 cursor-pointer">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-pink-500 cursor-pointer">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>

    </>
  );
}

export default Error;
