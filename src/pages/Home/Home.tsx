import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Product from "../../components/Product";
import Head from "../../components/Head";
import Button from "../../components/Button";
import "../../index.css"; // Import the custom CSS file

function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [collectionsRef, collectionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [productsRef, productsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : -100 }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-screen-xl px-4 pt-8 gap-6 sm:gap-0 sm:py-12 flex flex-col sm:flex-row justify-between items-center mt-8"
      >
        <div className="max-w-xl">
          <div className="text-mynavy text-center">
            <Head  h1="Make Your Look more" h2="Perfect"   />
            <p className="mt-4 max-w-lg text-center">Look your best on your best day</p>
            <div className="mt-8 w-full flex flex-wrap gap-4 text-center justify-center">
              <a
                href="#about"
                className="btn w-1/2 bg-myred hover:bg-myyellow text-white"
              >
                Get Started
              </a>
              <Link
                to="/home/shop"
                className="btn w-1/3 bg-mygreen hover:bg-myyellow text-white"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        <img
          className="w-2/3 sm:w-1/3 py-4 sm:p-0"
          src="/images/hero.png"
          alt=""
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        ref={aboutRef}
        id="about"
        className="mx-auto max-w-screen-xl px-4 pt-8 gap-6 sm:gap-0 sm:py-12 flex flex-col sm:flex-row items-center justify-between mt-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 100 }}
        transition={{ duration: 2 }}
      >
        <div className="mx-4 flex justify-between items-center flex-row-reverse flex-wrap">
          <div className="w-full flex-col flex-wrap px-4 lg:w-6/12 justify-between">
            <div className="w-full flex-col text-wrap px-2 pb-8 text-mynavy">
              <Head h1="Eat, Sleep, Fashion," h2="Repeat" />
              <h1 className="text-mynavy mb-4 text-2xl font-extrabold text-dark mt-6">
                Grab the limited time offer!
              </h1>
              <p className="mb">
                Get our premium and exclusive collections at{" "}
                <b> &#x20B9;21000/-</b> only
              </p>
            </div>
            <div className="w-full px-2 sm:p-0">
              <img
                className="w-full mt-8 duration-100"
                src="/images/fashion.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="w-full  lg:w-4/12 duration-200 transition-all ease-in">
            <div className="px-8 sm:p-0">
              <div className="relative z-10 inline-block px-4 pt-11 lg:pt-0 ">
                <img
                  src="/images/dress.jpg"
                  alt="hero"
                  className="w-full z-[-1]"
                />
                <span className="absolute -bottom-8 -right-10 z-[-2]">
                  <svg
                    width="93"
                    height="93"
                    viewBox="0 0 93 93"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2.5" cy="2.5" r="2.5" fill="#EF476F" />
                    <circle cx="2.5" cy="24.5" r="2.5" fill="#EF476F" />
                    <circle cx="2.5" cy="46.5" r="2.5" fill="#EF476F" />
                    <circle cx="2.5" cy="68.5" r="2.5" fill="#EF476F" />
                    <circle cx="2.5" cy="90.5" r="2.5" fill="#EF476F" />
                    <circle cx="24.5" cy="2.5" r="2.5" fill="#EF476F" />
                    <circle cx="24.5" cy="24.5" r="2.5" fill="#EF476F" />
                    <circle cx="24.5" cy="46.5" r="2.5" fill="#EF476F" />
                    <circle cx="24.5" cy="68.5" r="2.5" fill="#EF476F" />
                    <circle cx="24.5" cy="90.5" r="2.5" fill="#EF476F" />
                    <circle cx="46.5" cy="2.5" r="2.5" fill="#EF476F" />
                    <circle cx="46.5" cy="24.5" r="2.5" fill="#EF476F" />
                    <circle cx="46.5" cy="46.5" r="2.5" fill="#EF476F" />
                    <circle cx="46.5" cy="68.5" r="2.5" fill="#EF476F" />
                    <circle cx="46.5" cy="90.5" r="2.5" fill="#EF476F" />
                    <circle cx="68.5" cy="2.5" r="2.5" fill="#EF476F" />
                    <circle cx="68.5" cy="24.5" r="2.5" fill="#EF476F" />
                    <circle cx="68.5" cy="46.5" r="2.5" fill="#EF476F" />
                    <circle cx="68.5" cy="68.5" r="2.5" fill="#EF476F" />
                    <circle cx="68.5" cy="90.5" r="2.5" fill="#EF476F" />
                    <circle cx="90.5" cy="2.5" r="2.5" fill="#EF476F" />
                    <circle cx="90.5" cy="24.5" r="2.5" fill="#EF476F" />
                    <circle cx="90.5" cy="46.5" r="2.5" fill="#EF476F" />
                    <circle cx="90.5" cy="68.5" r="2.5" fill="#EF476F" />
                    <circle cx="90.5" cy="90.5" r="2.5" fill="#EF476F" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        
        </div>
      </motion.div>

      {/* New Collections Section */}
      <motion.div
        id="Collections"
        ref={collectionsRef}
        className="mx-auto overflow-hidden max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: collectionsInView ? 1 : 0,
          y: collectionsInView ? 0 : 100,
        }}
        transition={{ duration: 1 }}
      >
        <header className="text-center">
          <div className="text-mynavy">
            <Head h1="New" h2="Collections" />
          </div>
          <p className="mx-auto mt-4 max-w-md text-gray-1000 ">
            Explore our New Collections
          </p>
        </header>
        <div className="mt-8 flex flex-col items-center justify-center sm:flex-row gap-5">
          <div className="flex gap-5 w-2/3">
            <img
              src="/images/winter3.jpg"
              alt=""
              className="w-full transition duration-1000"
            />
          </div>
          <div className="flex gap-5 w-2/3">
            <img
              src="/images/winter1.jpg"
              alt=""
              className="w-full transition duration-1000 group-hover:opacity-90"
            />
          </div>
          <div className="flex flex-col w-2/3 gap-5">
            <img
              src="/images/winter2.jpg"
              alt=""
              className="w-full h-full transition duration-500 group-hover:opacity-90"
            />
            <img
              src="/images/winter4.jpg"
              alt=""
              className="w-full h-full transition duration-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Products Section */}
      <motion.div
        id="Products"
        ref={productsRef}
        className="mx-auto overflow-hidden max-w-screen-xl px-4 py-16 flex flex-col justify-between items-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: productsInView ? 1 : 0,
          y: productsInView ? 0 : 100,
        }}
        transition={{ duration: 1 }}
      >
        <div className="text-mynavy">
          <Head h1="Our" h2="Products" />
        </div>
        <div className="mt-12">
          <div className="mx-auto max-w-2xl px-4 py-8 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <Product
                desc=""
                image="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
                price={20}
                name="Diamond Blue Suit"
              />
              <Product
                desc=""
                image="https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b"
                price={99}
                name="Nomad Outfit"
              />
              <Product
                desc=""
                image="https://img.freepik.com/free-photo/young-woman-posing-with-paper-bag_23-2147741822.jpg?t=st=1715620411~exp=1715624011~hmac=240ba7232d04028ad4172480293d6b229d4d78e9b06532f3ca176d0e687239c1&w=360"
                price={56}
                name="Leaf Green Outfit"
              />
              <Product
                desc=""
                image="https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f"
                price={99}
                name="Red Casual Wear"
              />
            </div>
          </div>
          <Link to="/home/shop">
            <Button text="View More" color="mygreen" hover="myred" />
          </Link>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
