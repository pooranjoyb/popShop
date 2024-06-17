import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

function Floatingnav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0 },
          Hidden: { y: "-200%" },
        }}
        animate={hidden ? "Hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="navbar rounded-3xl fixed top-4 w-auto flex justify-center backdrop-filter backdrop-blur-md shadow-2xl max-w-screen-xl"
      >
        <ul className="flex justify-between px-12">
          <a href="/">
            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
              Home
            </li>
          </a>
          <a href="/#Collections">
            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
              Collections
            </li>
          </a>
          <a href="/#Products">
            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
              Products
            </li>
          </a>
          <a href="#Footer">
            <li className="hover:scale-105 duration-75 text-sm hover:font-semibold px-4 rounded-full">
              Contact
            </li>
          </a>
        </ul>
      </motion.div>
    </>
  );
}
export default Floatingnav;
