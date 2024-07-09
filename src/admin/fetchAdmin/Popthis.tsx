
interface Product {
    desc: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    rating: number;
  }
  interface Order {
    date: string;
    orderId: string;
    phone: number;
    price: number;
    product: Product[];
    status: string;
    username: string;
  }
  
  interface PopupProps {
    order: Order;
    onClose: () => void;
   
  }


 const Popthis: React.FC<PopupProps> = ({ order,onClose }) => {
    console.log(order);
    return (   <>
    <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="absolute inset-0 bg-mywhite bg-opacity-50"></div>
          {/* Popup */}
          <div className="relative p-8 rounded-lg shadow-lg w-1/2 bg-mywhite text-black">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-4 mr-4 text-xl"
            >
              &times;
            </button>
          {order.product.map((product) => (
        
        <>
           
            <h2 className="font-bold mb-4 text-2xl flex items-center justify-center text-myred">Products</h2><div className="mb-4 text-lg">
                     <strong>desc</strong> {product.desc}
                 </div><div className="mb-4 text-lg">
                         <strong> Name:</strong> {product.name}
                     </div><div className="mb-4 text-lg">
                         <strong>Price:</strong> ${product.price}
                     </div><div className="mb-4 text-lg">
                         <strong>Quantity:</strong> {product.price}
                     </div><div className="mb-4 text-lg">
                         <strong>Rating:</strong> {product.quantity}
                     </div>
         
        </>
    ))} <div className="mb-4 text-lg">
    <strong>Status:</strong> {order.status}
</div>
</div>
</div>
    </>
      )
    }

export default Popthis;