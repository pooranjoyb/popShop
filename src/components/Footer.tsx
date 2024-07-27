import { useState } from 'react';
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from "./Button";
import { supabase } from '../utils/client';
import GoogleTranslateComponent from './GoogleTranslateComponent';


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
          <Link to="/home/profile" className="text-gray-700 transition hover:opacity-75">Profile</Link>
        </li>
        <li>
          <Link to="/home/shop/cart" className="text-gray-700 transition hover:opacity-75">View Cart</Link>
        </li>
        <li>
          <Link to="/home/shop" className="text-gray-700 transition hover:opacity-75">Order Now</Link>
        </li>
        <li>
          <Link to="#" className="text-gray-700 transition hover:opacity-75">Join Us</Link>
        </li>
        <li>
          <Link to="/#about" className="text-gray-700 transition hover:opacity-75">About</Link>
        </li>
      </ul>
    </>
  );
};

export default function NewFooter() {
  const [email, setEmail] = useState('');
  const today = new Date();
  const year = today.getFullYear();

  const handleSubscribe = async () => {
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log("Email send to", email);

    const emailData = {
      service_id: 'your_service_id',
      template_id: 'your_template_id',
      user_id: 'your_user_id',
      template_params: { user_email: email }
    };

    try {
      // Save subscriber information in Supabase
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        throw error;
      }

      // Send confirmation email using EmailJS
      const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
      console.log('Email sent successfully:', response.data);
      alert('Subscription email sent');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send subscription email');
    }
  };

  return (
    <>
      <div className="md:h-40 md:flex md:justify-center md:items-center flex flex-col justify-between items-center p-4">
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center">
          <p className="md:text-3xl text-2xl font-bold">
            Subscribe to our newsletter
          </p>
          <p className="md:text-lg">
            Stay up to date with our latest news, exclusive offers, and promotions.
          </p>
        </div>
        <div className="md:flex gap-4 md:w-1/2 justify-center items-center flex flex-col md:flex-row mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button text='Subscribe' color='mygreen' hover='myred' onClick={handleSubscribe} />
        </div>
      </div>
      <footer
        id="Footer"
        className="text-mynavy mx-auto max-w-screen-xl px-4 my-12 flex flex-wrap items-center gap-8 lg:grid lg:grid-cols-5 max-sm:flex-col"
      >
        <div className="lg:col-span-2 h-full w-full p-2 sm:p-0">
          <img
            src="/images/footer.jpg"
            alt="footer image"
            className="h-full w-full object-cover"
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
                  123456789
                </span>
              </p>
              <p>
                <span>Monday to Friday: 10am - 5pm</span>
                <br />
                <span>Weekend: 10am - 3pm</span>
              </p>
              <Socials />
              <GoogleTranslateComponent />
            </div>
            <div className="sm:w-52 grow w-full mx-auto">
              <ServicesList />
            </div>
            
          </div>
          <div className="mt-12 border-t border-gray-100 flex flex-wrap max-sm:text-left items-center justify-between pt-8 space-8 gap-x-8">
            <div className="text-xs flex gap-x-4">
              <Link to="/home/terms-and-conditions">Terms & Conditions</Link>
            </div>
            <p className="text-xs text-gray-500">
              &copy; {year}. PopShop.com. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
