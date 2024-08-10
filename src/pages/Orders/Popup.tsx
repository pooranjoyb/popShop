interface Product {
  desc: string | null;
  image: string;
  name: string;
  price: number;
  quantity: number;
  ratings: number;
  size: string;
}

interface ORDER {
  username: string;
  orderId: string;
  product: Product[];
  date: string;
  phone: number;
  status: string;
  price: string;
}

interface PopupProps {
  order: ORDER;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ order, onClose }) => {
    return (
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
          <h2 className="font-bold mb-4 text-2xl flex items-center justify-center text-myred">INVOICE</h2>
          <div className="mb-4 text-lg">
            <strong>Order No:</strong> {order.orderId}
          </div>
          <div className="mb-4 text-lg">
            <strong>Product Name:</strong> {order.product[0].name}
          </div>
          <div className="mb-4 text-lg">
            <strong>Price:</strong> ${order.price}
          </div>
          <div className="mb-4 text-lg">
            <strong>Date:</strong> {order.date}
          </div>
          <div className="mb-4 text-lg">
            <strong>Status:</strong> {order.status}
          </div>
        </div>
      </div>
    );
  };
  
  export default Popup;
  