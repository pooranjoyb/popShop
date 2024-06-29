const Popup = ({ order, onClose }) => {
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
            <strong>Order No:</strong> {order.orderNo}
          </div>
          <div className="mb-4 text-lg">
            <strong>Product Name:</strong> {order.productName}
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
  