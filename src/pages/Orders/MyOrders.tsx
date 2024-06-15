import { Link } from 'react-router-dom';
import Head from '../../components/Head';
import Button from '../../components/Button';

// Static data for orders (replace with real data from the database later)
const orders = [
  {
    orderNo: '0001',
    productName: 'Diamond Blue Suit',
    price: 20,
    date: '5 Jun 2023',
    status: 'Paid',
  },
  {
    orderNo: '0002',
    productName: 'Leaf Green Outfit',
    price: 99,
    date: '8 Jun 2023',
    status: 'Cancelled',
  },
  {
    orderNo: '0003',
    productName: 'Red Casual Wear',
    price: 56,
    date: '8 Aug 2023',
    status: 'Pending',
  },
  {
    orderNo: '0004',
    productName: 'Diamond Blue Suit',
    price: 20,
    date: '21 Jan 2022',
    status: 'Paid',
  },
];

const MyOrders = () => {
  return (
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
              <tr key={index} className={index % 2 === 0 ? 'bg-base-200' : 'bg-base-100'}>
                <td>{order.orderNo}</td>
                <td>{order.productName}</td>
                <td>${order.price}</td>
                <td>{order.date}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === 'Paid'
                        ? 'badge-success badge-outline'
                        : order.status === 'Cancelled'
                        ? 'badge-error badge-outline'
                        : 'badge-warning badge-outline'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link to="#">
                  <Button text="View" color="mygreen" hover="myyellow" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default MyOrders;