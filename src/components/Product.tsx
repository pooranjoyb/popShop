import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { supabase } from "../utils/client";

interface Data {
  name: string;
  image: string;
  price: number;
  desc: string;
}

function Product({ name, image, price, desc }: Data) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);

  const handleNavigate = () => {
    navigate("/home/shop/product", { state: { name, image, price, desc } });
  };
  const handleLike = async () => {
    setLiked(!liked);
        // If product is liked, add it to Supabase
    if (!liked) {
      const { error } = await supabase
        .from("liked_products")
        .insert([
          { name, image, price, desc, created_at: new Date().toISOString() }
        ]);
        if(error){
          console.error("error inserting product into supabase",error)
        }
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`relative top-[-95%] left-[75%] p-2 rounded-full ${
            liked ? "text-red-500" : "text-gray-500"
          } hover:text-red-500 transition-colors duration-300 cursor-pointer`}
          onClick={handleLike}
        >
          <HiHeart size={24} color={liked ? "red" : "white"} />
        </div>
        <button onClick={handleNavigate}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={image}
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              className="h-[500px] w-full object-cover object-center group-hover:opacity-75 hover:duration-300"
            />
          </div>

          <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">₹{price}</p>
        </button>
      </div>
    </>
  );
}

export default Product;
