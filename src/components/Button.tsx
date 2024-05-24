// interface ButtonProps {
//     color: string;
//     hover: string;
//     text: string;
//     onClick?: () => void;
// }

// function Button({ color, hover, text, onClick }: ButtonProps) {
//     return (
//         <div className="flex items-center justify-center">
//             <button className={`btn bg-${color} hover:bg-${hover}`} onClick={onClick}>
//                 {text}
//             </button>
//         </div>
//     )
// }

// export default Button
import { motion } from 'framer-motion';
import './button.css';

interface ButtonProps {
    color?: string;
    hover?: string;
    text: string;
    onClick?: () => void;
}

const Button = ({ color, hover, text, onClick }: ButtonProps) => {
    return (
        <div className="flex items-center justify-center">

            <motion.button 
                className={`btn bg-${color} hover:bg-${hover}`} 
                onClick={onClick}
                whileTap={{ scale: 0.9 }}>

            <button className={`btn bg-${color} hover:bg-${hover}  `} onClick={onClick}>

                {text}
            </motion.button>
        </div>
    )
}

export default Button;
