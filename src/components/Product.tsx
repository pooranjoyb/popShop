import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProductProps {
    name: string;
    image: string;
    price: number;
    desc: string;
    children?: ReactNode;
}

function Product({ name, image, price, desc, children }: ProductProps) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/home/product", { state: { name, image, price, desc } });
    }

    return (
        <div>
            <button onClick={handleNavigate}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src={image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75 hover:duration-300" />
                </div>
                <div>
                    <h3 className="mt-4 text-sm text-gray-700 text-left">{name}</h3>
                    <p className="mt-1 text-lg font-medium text-left text-gray-900">${price}</p>
                    {children}
                </div>
            </button>
        </div>
    )
}

export default Product;
