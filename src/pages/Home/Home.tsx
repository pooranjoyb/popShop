import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Product from "../../components/Product";
import Head from "../../components/Head";
import Button from "../../components/Button";
import "../../index.css";
import { supabase } from "../../utils/client";
import { Tilt } from "react-tilt";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize useInView options
  const observerOptions = useMemo(
    () => ({
      triggerOnce: true,
      threshold: 0.2,
    }),
    []
  );

  // useInView hooks
  const [heroRef, heroInView] = useInView(observerOptions);
  const [aboutRef, aboutInView] = useInView({ ...observerOptions, threshold: 0.1 });
  const [collectionsRef, collectionsInView] = useInView(observerOptions);
  const [productsRef, productsInView] = useInView(observerOptions);

  // Fetch products with useCallback to prevent redefinition
  const getProducts = useCallback(async () => {
    try {
      const { data } = await supabase.from("Product_at_Home").select();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []); // Empty deps since supabase is stable

  // Run getProducts only once on mount
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Main content component
  const MainContent = useCallback(() => {
    return (
      <>
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : -100 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-screen-xl px-4 pt-8 gap-6 sm:gap-0 sm:py-12 flex flex-col sm:flex-row justify-between items-center mt-8"
        >
          <div className="max-w-xl">
            <div className="text-mynavy">
              <Head h1="Make Your Look more" h2="Perfect" />
              <p className="mt-4 max-w-lg">Look your best on your best day</p>
              <div className="mt-8 w-full flex flex-wrap gap-4 text-center">
                <a href="#about" className="btn w-1/2 bg-myred hover:bg-myyellow text-white">
                  Get Started
                </a>
                <Link to="/home/shop" className="btn w-1/3 bg-mygreen hover:bg-myyellow text-white">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <Tilt options={{ max: 25, scale: 1.05, speed: 400 }} className="w-2/3 sm:w-1/3 py-4 sm:p-0">
            <img src="/images/hero.png" alt="" />
          </Tilt>
        </motion.div>

        <motion.div
          ref={aboutRef}
          id="about"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 100 }}
          transition={{ duration: 2 }}
          className="mx-auto max-w-screen-xl px-4 pt-8 gap-6 sm:gap-0 sm:py-12 flex flex-col sm:flex-row items-center justify-between mt-8"
        >
          <div className="mx-4 flex justify-between items-center flex-row-reverse flex-wrap">
            <div className="w-full flex-col flex-wrap px-4 lg:w-6/12 justify-between">
              <div className="w-full flex-col text-wrap px-2 pb-8 text-mynavy">
                <Head h1="Eat, Sleep, Fashion," h2="Repeat" />
                <h1 className="text-mynavy mb-4 text-2xl font-extrabold text-dark mt-6">
                  Grab the limited time offer!
                </h1>
                <p className="mb">
                  Get our premium and exclusive collections at <b> ₹21000/-</b> only
                </p>
              </div>
              <div className="w-full px-2 sm:p-0">
                <img className="w-full mt-8 duration-100" src="/images/fashion.jpg" alt="" />
              </div>
            </div>
            <div className="w-full lg:w-4/12 duration-200 transition-all ease-in">
              <div className="px-8 sm:p-0">
                <div className="relative z-10 inline-block px-4 pt-11 lg:pt-0">
                  <img src="/images/dress.jpg" alt="hero" className="w-full z-[-1]" />
                  <span className="absolute -bottom-8 -right-10 z-[-2]">
                    <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#EF476F" />
                      {/* ... (rest of the SVG circles) */}
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          id="Collections"
          ref={collectionsRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: collectionsInView ? 1 : 0, y: collectionsInView ? 0 : 100 }}
          transition={{ duration: 1 }}
          className="mx-auto overflow-hidden max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
        >
          <header className="text-center">
            <div className="text-mynavy">
              <Head h1="New" h2="Collections" />
            </div>
            <p className="mx-auto mt-4 max-w-md text-gray-1000">
              Explore our New Collections
            </p>
          </header>
          <div className="mt-8 flex flex-col items-center justify-center sm:flex-row gap-5">
            <div className="flex gap-5 w-2/3">
              <img src="/images/winter3.jpg" alt="" className="w-full transition duration-1000" />
            </div>
            <div className="flex gap-5 w-2/3">
              <img src="/images/winter1.jpg" alt="" className="w-full transition duration-1000 group-hover:opacity-90" />
            </div>
            <div className="flex flex-col w-2/3 gap-5">
              <img src="/images/winter2.jpg" alt="" className="w-full h-full transition duration-500 group-hover:opacity-90" />
              <img src="/images/winter4.jpg" alt="" className="w-full h-full transition duration-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          id="Products"
          ref={productsRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: productsInView ? 1 : 0, y: productsInView ? 0 : 100 }}
          transition={{ duration: 1 }}
          className="mx-auto overflow-hidden max-w-screen-xl px-4 py-16 flex flex-col justify-between items-center"
        >
          <div className="text-mynavy">
            <Head h1="Our" h2="Products" />
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl px-4 py-8 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((elem, idx) => (
                  <Product
                    key={idx}
                    desc={elem.Desc}
                    image={elem.Image_Link}
                    price={elem.Price}
                    name={elem.Name}
                    rating={elem.rating}
                  />
                ))}
              </div>
            </div>
            <Link to="/home/shop">
              <Button text="View More" color="mygreen" hover="myred" />
            </Link>
          </div>
        </motion.div>
      </>
    );
  }, [heroInView, aboutInView, collectionsInView, productsInView, products]);

  return (
    <div className="relative min-h-screen">
      <div className={`transition-all duration-300 ${loading ? "blur-md pointer-events-none" : ""}`}>
        <MainContent />
      </div>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex items-center space-x-4">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 border-t-myred h-16 w-16 animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;