import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Data {
  name: string;
  image: string;
  price: number;
  desc: string;
}

function Product({ name, image, price, desc }: Data) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home/shop/product", { state: { name, image, price, desc } });
  };
  return (
    <>
      <button onClick={handleNavigate}>
        <motion.div
           whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={image}
            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
            className="h-full w-full object-cover object-center group-hover:opacity-75 hover:duration-300"
          />
        </motion.div>
        <h3 className="mt-9 text-sm text-gray-700">{name}</h3>
        <p className="mt-4 text-lg font-medium text-gray-900">${price}</p>
      </button>
    </>
  );
}

export default Product;
