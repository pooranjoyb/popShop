import { useEffect, useState } from "react";
import { supabase } from "../utils/client"; // Adjust the path as necessary

interface LikedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  desc: string;
  created_at: string;
}

function Liked() {
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      const { data, error } = await supabase
        .from('liked_products') // Replace with your table name
        .select('*');
        
      if (error) {
        setError('Failed to fetch liked products');
        console.error('Error fetching liked products:', error);
      } else {
        setLikedProducts(data || []);
      }
      setLoading(false);
    };

    fetchLikedProducts();
  }, []);

 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liked Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedProducts.length === 0 ? (
          <p>No liked products found.</p>
        ) : (
          likedProducts.map((product) => (
            <div key={product.name} className="relative border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.desc}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">₹{product.price}</p>
               
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Liked;
