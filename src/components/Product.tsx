import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { supabase } from "../utils/client";

interface Data {
  name: string;
  image: string;
  price: number;
  desc: string;
  rating: string;
}

function Product({ name, image, price, desc, rating }: Data) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);

  const handleNavigate = () => {
    navigate("/home/shop/product", {
      state: { name, image, price, desc, rating }
    });
    console.log("Product rating ", rating);
  };

  const handleLike = async () => {
    setLiked(!liked);
    if (!liked) {
      const { error } = await supabase
        .from("liked_products")
        .insert([
          {
            name,
            image,
            price,
            desc,
            created_at: new Date().toISOString(),
            rating
          }
        ]);
      if (error) {
        console.error("Error inserting product into Supabase", error);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`relative top-[10%] left-[75%] p-2 z-10 rounded-full ${
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
            alt={name}
            className="h-[500px] w-full object-cover object-center"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">₹{price}</p>
       
      </button>
    </div>
  );
}

export default Product;
