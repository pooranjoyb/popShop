import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../utils/cn";

export const FloatingNav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setVisible(screenSize >= 1024);
  }, [screenSize]);

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit -my-10 inset-x-0 mx-auto border border-transparent rounded-full bg-mygreen/50 backdrop-blur-3xl shadow-lg z-[5000] pr-2 pl-2 py-2 items-center justify-center space-x-4",
            className
          )}
        >
          <button
            onClick={() => scrollTo("Nav")}
            className="hover:bg-myyellow/80 hover:text-blue-500 text-sm font-medium relative text-black px-4 py-2 rounded-full"
          >
            <span className="">Home</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>

          <button
            onClick={() => scrollTo("Collections")}
            className="hover:bg-myyellow/80 hover:text-blue-500 text-sm font-medium relative text-black px-4 py-2 rounded-full"
          >
            <span className="">New Collections</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>

          <button
            onClick={() => scrollTo("Products")}
            className="hover:bg-myyellow/80 hover:text-blue-500 text-sm font-medium relative text-black px-4 py-2 rounded-full"
          >
            <span className="">Our Products</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>

          <button
            onClick={() => scrollTo("Footer")}
            className="hover:bg-myyellow/80 hover:text-blue-500 text-sm font-medium relative text-black px-4 py-2 rounded-full"
          >
            <span className="">Contact Us</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
