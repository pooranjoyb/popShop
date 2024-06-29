import Popup from "./Popup";
import { Link } from "react-router-dom";
import Head from "../../components/Head";
import Button from "../../components/Button";
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
  const [orders, setOrders] = useState<ORDER[]>([]);
  const userName = useSelector((state: RootState) => state.auth.user.username);

  const handleViewClick = (order: ORDER) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
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
            </div>
          </div>
          {selectedOrder && (
            <Popup order={selectedOrder} onClose={handleClosePopup} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyOrders;
