/* eslint-disable react-hooks/rules-of-hooks */

//Below component is a additional Navbar functionality using framer-motion for animation.
import {motion,useMotionValueEvent,useScroll} from 'framer-motion'
import { useState } from 'react'

function Floatingnav(){
    const {scrollY} = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest)=>{
        const previous = scrollY.getPrevious();
        if(previous && latest > previous && latest >80){
            setHidden(true);
        }else{
            setHidden(false);
        }
    });
    return(
        <>
            <motion.div
                variants={{
                    visible: {y: 0},
                    Hidden: {y: "-200%"},
                }}
                animate={hidden? "Hidden" : "visible"}
                transition={{duration: 0.30, ease: "easeInOut"}}
                className=" navbar rounded-3xl fixed top-4 w-auto flex justify-center backdrop-filter backdrop-blur-md shadow-2xl max-w-screen-xl"
            >
                <ul className="flex justify-between">
                    <a href="/home">
                    <li className="hover:bg-myyellow font-bold px-4 py-2 m-2 rounded-full">Home</li>
                    </a>
                    <a href="/home#Collections">
                    <li className="hover:bg-myyellow font-bold px-4 py-2 m-2 rounded-full">New Collections</li>
                    </a>
                    <a href="/home#Products">
                    <li className="hover:bg-myyellow font-bold px-4 py-2 m-2 rounded-full">Our Products</li>
                    </a>
                    <a href="#Footer">
                    <li className="hover:bg-myyellow font-bold px-4 py-2 m-2 rounded-full">Contact Us</li>
                    </a>
                </ul>
            </motion.div>
        </>
    )    
}
export default Floatingnav;
