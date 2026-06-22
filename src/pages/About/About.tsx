import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Head from "../../components/Head";
import { Tilt } from "react-tilt";

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      transition={{ duration: 1 }}
      className="mx-auto max-w-screen-xl px-4 py-16"
    >
      <div className="text-mynavy mb-12">
        <Head h1="About" h2="Us" />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <Tilt
            options={{ max: 15, scale: 1.05, speed: 400 }}
            className="w-full"
          >
            <img
              src="/images/fashion.jpg"
              alt="About PopShop"
              className="w-full rounded-2xl shadow-xl"
            />
          </Tilt>
        </div>

        <div className="w-full lg:w-1/2 text-mynavy space-y-6">
          <h2 className="text-3xl font-bold">Welcome to PopShop</h2>
          <p className="text-lg leading-relaxed">
            PopShop is your ultimate destination for trendy and fashionable
            apparel. We believe that style should be accessible to everyone,
            which is why we curate the best collections at prices that won't
            break the bank.
          </p>
          <p className="text-lg leading-relaxed">
            From casual wear to premium exclusives, our platform offers a
            seamless shopping experience with a wide range of sizes and styles
            to suit every personality.
          </p>
          <p className="text-lg leading-relaxed">
            Join thousands of happy customers and redefine your wardrobe with
            PopShop — where fashion meets passion.
          </p>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-8 rounded-xl shadow-lg bg-white">
          <h3 className="text-2xl font-bold text-mynavy mb-4">Our Mission</h3>
          <p className="text-gray-600">
            To provide high-quality fashion at affordable prices while
            delivering an exceptional shopping experience.
          </p>
        </div>
        <div className="p-8 rounded-xl shadow-lg bg-white">
          <h3 className="text-2xl font-bold text-mynavy mb-4">Our Vision</h3>
          <p className="text-gray-600">
            To become the go-to fashion destination for style-conscious
            individuals worldwide.
          </p>
        </div>
        <div className="p-8 rounded-xl shadow-lg bg-white">
          <h3 className="text-2xl font-bold text-mynavy mb-4">Our Values</h3>
          <p className="text-gray-600">
            Quality, affordability, inclusivity, and customer satisfaction are
            at the heart of everything we do.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
