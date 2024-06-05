import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import { MdOutlineShoppingCart } from "react-icons/md";

interface Data {
  name: string;
  image: string;
  price: number;
  desc: string;
}

function Product({ name, image, price, desc }: Data) {
  const navigate = useNavigate();
  const addToCart = () => {
    // logic for adding in cart
    toast.success("Added to Cart", { autoClose: 2000 });
  };
  const handleNavigate = () => {
    navigate("/shop/product", { state: { name, image, price, desc } });
  };
  return (
    <>
      <div className="flex flex-col">
        <button onClick={handleNavigate}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={image}
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              className="h-full w-full object-cover object-center group-hover:opacity-75 hover:duration-300"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
        </button>
        <div className="flex flex-auto justify-between px-4 pb-4 space-x-24">
          <MdOutlineShoppingCart
            className="flex m-2 h-10 w-10"
            onClick={addToCart}
          />

          <Button text="Buy Now" color="myyellow" hover="myred" />
        </div>
      </div>
    </>
  );
}

export default Product;
