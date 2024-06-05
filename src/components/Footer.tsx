import { FaFacebook, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Socials = () => {
  return (
    <ul className="flex gap-x-6">
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
  );
};

const ServicesList = () => {
  return (
    <>
      <p className="font-medium text-gray-900">Services</p>

      <ul className="mt-6 space-y-4 text-sm">
        <li>
          <Link
            to="/profile"
            className="text-gray-700 transition hover:opacity-75"
          >
            {" "}
            Profile{" "}
          </Link>
        </li>
        <li>
          <Link
            to="/shop/cart"
            className="text-gray-700 transition hover:opacity-75"
          >
            {" "}
            View Cart{" "}
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="text-gray-700 transition hover:opacity-75"
          >
            {" "}
            Order Now
          </Link>
        </li>
        <li>

          <Link
            to="/contact"
            className="text-gray-700 transition hover:opacity-75"
          >
            {" "}
            Contact Us{" "}
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
    </>
  );
};

export default function NewFooter() {
  return (
    <footer id="Footer" className="text-mynavy mx-auto max-w-screen-xl px-4 my-12 flex flex-wrap items-center gap-8 lg:grid lg:grid-cols-5 max-sm:flex-col">
      <div className="lg:col-span-2 h-full w-full p-2 sm:p-0">
        <img
          src="/images/footer.jpg"
          alt="footer image"
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-rows-4 w-full lg:col-span-3 max-sm:px-4">
        <div className="row-span-3 flex justify-stretch gap-8 h-full w-full max-sm:flex-col max-sm:items-center">
          <div className="space-y-8 grow w-full">
            <p className="text-4xl font-extrabold">
              <span>Call Us</span>
              <br />
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
            </p>
            <p>
              <span>Monday to Friday: 10am - 5pm</span>
              <br />
              <span>Weekend: 10am - 3pm</span>
            </p>
            <Socials />
          </div>
          <div className="sm:w-52 grow w-full mx-auto">
            <ServicesList />
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 flex flex-wrap max-sm:text-left items-center justify-between pt-8 space-8 gap-x-8">
        <div className="text-xs flex gap-x-4">
            <Link to="/home/terms-and-conditions#terms">Terms & Conditions</Link>
            <Link to="/home/terms-and-conditions#">Privacy Policy</Link>
            <Link to="/home/terms-and-conditions#cookies">Cookies</Link>
          </div>
          <p className="text-xs text-gray-500">
            &copy; 2024. PopShop.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
