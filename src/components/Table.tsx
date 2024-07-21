

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "../components/Head";
import Button from "../components/Button";
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
interface PopupProps {
  order: Order;
  onClose: () => void;
 
}

const Table: React.FC<DisplayOrdersProps> = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPopthis, setShowPopthis] = useState(false);

  const totalPages = Math.ceil(orders.length / pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const displayedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const handleViewClick = (order: Order) => {
    setSelectedOrder(order);
    setShowPopthis(true);
  };

  const handleClosePopthis = () => {
    setShowPopthis(false);
    setSelectedOrder(null);
  };
  
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


  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
        <Head  h2="Orders" />
        
      </div>
      <div className=" pl-10 w-full max-w-6xl mx-auto mb-32">
        <div className="  overflow-x-auto rounded-lg border border-base-300">
          <table className=" table w-full max-w-full">
            <thead>
              <tr className="text-neutral">
                <th >Date</th>
                <th className="pl-10">Order ID</th>
                <th className="pl-10">Phone</th>
                <th className="pl-10">Price</th>
                <th className="pl-10">Username</th>
                <th className="pl-10">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={index % 2 === 0 ? "bg-base-200" : "bg-base-100"}
                >
                  <td >{order.date}</td>
                  <td className="pl-10">{order.orderId}</td>
                  <td className="pl-10">{order.phone}</td>
                  <td className="pl-10">${order.price}</td>
                  <td className="pl-10">{order.username}</td>
                  <td className="pl-10">
                    <Link to="#">
                      <Button
                        text="View"
                        color="mygreen"
                        hover="myyellow"
                        onClick={() => handleViewClick(order)}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
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
      {showPopthis && selectedOrder && (
        <Popthis
          order={selectedOrder}
          onClose={handleClosePopthis}
        />
      )}
    </>
  );
  
};

export default Table;
