import Popup from "./Popup";
import ReturnExchangePopup from "./ReturnExchangePopup";
import { Link } from "react-router-dom";
import Head from "../../components/Head";
import { Button as BootstrapButton } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import Loader from "../../components/Loader/Loader";

export interface Product {
  desc: string | null;
  image: string;
  name: string;
  price: number;
  quantity: number;
  ratings: number;
  size: string;
}

export interface ORDER {
  username: string;
  orderId: string;
  product: Product[];
  date: string;
  phone: number;
  status: string;
  price: string;
}

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<ORDER | null>(null);
  const [returnExchangeOrder, setReturnExchangeOrder] = useState<ORDER | null>(null);
  const [orders, setOrders] = useState<ORDER[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const userName = useSelector((state: RootState) => state.auth.user.username);

  const handleViewClick = (index: number) => {
    setOpenDropdown(index === openDropdown ? null : index);
  };

  const handleInvoiceClick = (order: ORDER) => {
    setSelectedOrder(order);
    setOpenDropdown(null);
  };

  const handleReturnClick = (order: ORDER) => {
    setReturnExchangeOrder(order);
    setOpenDropdown(null);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  const handleCloseReturnExchangePopup = () => {
    setReturnExchangeOrder(null);
  };

  const handleReturnExchangeSubmit = (type: "return" | "exchange", details: string) => {
    // Handle the submission logic here, e.g., updating the order status in the database
    console.log(`${type} action submitted for order ${returnExchangeOrder?.orderId}: ${details}`);
  };

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("username", userName);

        if (error) throw error;

        if (data) setOrders(data);
        else setOrders([]);
      } catch (err) {
        console.log("Error fetching orders: ", err);
      }
    };

    if (userName) fetchOrdersData();
  }, [userName]);

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <>
      {orders ? (
        <>
          <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
            <Head h1="My" h2="Orders" />
          </div>

          <div className="w-2/3 mx-auto mb-32 mt-12">
            <div className="overflow-x-auto rounded-lg border border-base-300">
              <table className="table w-full">
                {/* Table header */}
                <thead>
                  <tr className="text-neutral">
                    <th>Order No.</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="pl-12">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                      }
                    >
                      <td>{truncateText(order.orderId, 10)}</td>
                      <td>{order.product[0].name}</td>
                      <td>${order.price}</td>
                      <td>{order.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Paid"
                              ? "badge-success badge-outline"
                              : order.status === "Cancelled"
                              ? "badge-error badge-outline"
                              : "badge-warning badge-outline"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                      <div className="relative">
                          <BootstrapButton
                            className="btn btn-secondary dropdown-toggle bg-mygreen hover-myyellow"
                            type="button"
                            id="dropdownMenuButton"
                            aria-expanded="false"
                            style={{borderColor: '#ffffff'}}
                            onClick={() => handleViewClick(index)}
                          >View</BootstrapButton>
                          {openDropdown === index && (
                            <ul
                              className="dropdown-menu absolute right-0 mt-2 py-1 w-48 bg-mywhite border rounded shadow-md z-10"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li>
                                <Link to="#">
                                  <button
                                    className="dropdown-item w-full text-left px-4 py-2"
                                    onClick={() => handleInvoiceClick(order)}
                                  >
                                    Invoice
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to="#">
                                  <button
                                    className="dropdown-item w-full text-left px-4 py-2"
                                    onClick={() => handleReturnClick(order)}
                                  >
                                    Return/Exchange
                                  </button>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedOrder && (
            <Popup order={selectedOrder} onClose={handleClosePopup} />
          )}
          {returnExchangeOrder && (
            <ReturnExchangePopup
              order={returnExchangeOrder}
              onClose={handleCloseReturnExchangePopup}
              onSubmit={handleReturnExchangeSubmit}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyOrders;
