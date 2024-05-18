import { useEffect } from "react";
import Head from "./Head";
function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div id="#about">
      <div className="mx-auto max-w-screen-xl py-6">
        <Head h1={"Welcome to PopShop.com"} h2={""}/>
        <Head h1={""} h2={"Your One-Stop Shop for Fashion!"}/>
      </div>
      <div className="mx-12 max-w-screen-xl px-4 py-12">
        <p className="text-lg mb-4">
          At <span className="text-mynavy font-bold">PopShop.com</span>, we're more than just an e-commerce store; we're a vibrant community of fashion enthusiasts, experts, and shoppers just like you, passionate about the latest trends and timeless styles. We vision to bring you the best, the latest, and the most stylish clothing right to your doorstep.
        </p>
        
        <h2 className="text-2xl flex justify-center text-mynavy font-bold mb-4 underline">Our Story</h2>
        <div className="flex gap-5 my-10">
          <p className="text-lg mb-4">
          <span className="text-mynavy font-bold">PopShop.com</span> was founded with a simple idea: shopping for fashion should be fun, easy, and exciting. Tired of the mundane and uninspired, we set out to create a store that offers not just clothes, but a whole new shopping experience. From humble beginnings, we’ve grown into a go-to destination for quality and style, always keeping our customers at the heart of everything we do.
          </p>
          <img src="/images/fashion.jpg" alt="img" className="max-w-lg"/>
        </div>

        <h2 className="text-2xl flex justify-center text-mynavy font-bold mb-4 underline">Our Promise</h2>
        <div className="flex gap-5 my-10">
        <img src="/images/winter4.jpg" alt="img" className="max-w-lg"/>
        <p className="text-lg mb-4 flex items-center">
          We promise to bring you top-notch quality, unparalleled service, and a shopping experience that’s as enjoyable as the outfits you’ll find here. Whether you're a long-time customer or a first-time visitor, we’re committed to exceeding your expectations every step of the way.
        </p>
        </div>
      </div>
    </div>
  );
}
export default About;