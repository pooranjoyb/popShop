import React, { useState } from 'react';

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

interface DisplayOrdersProps {
  orders: Order[];
}

const DisplayOrders: React.FC<DisplayOrdersProps> = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const totalPages = Math.ceil(orders.length / pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const displayedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs w-full">  {/* Added w-full class for full width */}
          <thead>
            <tr className="hover">
              <th className="px-12">Date</th>  {/* Added px-4 for padding */}
              <th className="px-14">Order ID</th>  {/* Added px-4 for padding */}
              <th className="px-12">Phone</th>  {/* Added px-4 for padding */}
              <th className="px-12">Price</th>  {/* Added px-4 for padding */}
              <th className="px-12">Status</th>  {/* Added px-4 for padding */}
              <th className="px-12">Username</th>  {/* Added px-4 for padding */}
              <th className="px-12">Products</th>  {/* Added px-4 for padding */}
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => (
              <tr key={order.orderId} className="hover">
                <td className="px-5">{order.date}</td>  {/* Added px-4 for padding */}
                <td className="px-5">{order.orderId}</td>  {/* Added px-4 for padding */}
                <td className="px-12">{order.phone}</td>  {/* Added px-4 for padding */}
                <td className="px-12">{order.price}</td>  {/* Added px-4 for padding */}
                <td className="px-12">{order.status}</td>  {/* Added px-4 for padding */}
                <td className="px-12">{order.username}</td>  {/* Added px-4 for padding */}
                <td>
                  <div>
                    {order.product.map((product, index) => (
                      <div key={index}>
                        <div>
                          <div>
                          <p style={{ marginTop: '10px', marginBottom: "11px" }}>{product.name}</p>
                            <p>{product.desc}</p>
                          </div>
                        </div>
                        <div className="flex space-x-4">  {/* Added flexbox for spacing */}
                          <p>Price: ${product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Rating: {product.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls (adjust styling as needed) */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`mx-2 px-3 py-1 rounded-md text-sm focus:outline-none ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayOrders;
