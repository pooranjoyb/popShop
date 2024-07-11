import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Customer {
  id: number;
  name: string;
  dateJoined: string;
  profilePhoto: string;
  totalPurchase: number; 
}

function Dashboard() {
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [weeklySales, setWeeklySales] = useState<number>(0);
  const currentOnlineUsers = 78; 
  const [salesDetails, setSalesDetails] = useState({
    fromDate: '2023-01',
    toDate: '2023-07',
    salesNumber: 5000,
    percentageIncrease: 10
  });

  // Simulate fetching recent customers and weekly sales (dummy data)
  useEffect(() => {
    // Fetch Recent Customers
    const fetchRecentCustomers = async () => {
      // Example
      const dummyCustomers: Customer[] = [
        { id: 1, name: 'John Doe', dateJoined: '2023-07-08', profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg', totalPurchase: 1200 },
        { id: 2, name: 'Jane Smith', dateJoined: '2023-07-07', profilePhoto: 'https://randomuser.me/api/portraits/women/1.jpg', totalPurchase: 1500 },
        { id: 3, name: 'Michael Johnson', dateJoined: '2023-07-06', profilePhoto: 'https://randomuser.me/api/portraits/men/2.jpg', totalPurchase: 900 },
      ];

      // Set the recent customers in state
      setRecentCustomers(dummyCustomers);
    };

    // Fetch Weekly Sales
    const fetchWeeklySales = async () => {
      // Example
      const weeklySalesData: number = 5000;

      // Set the weekly sales in state
      setWeeklySales(weeklySalesData);
    };

    fetchRecentCustomers();
    fetchWeeklySales();
  }, []); 

  const handleAddNew = () => {
    // Handle adding a new item action here
    console.log('Add New button clicked!');
  };

 // Data for the Weekly Sales
const barChartData = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [1200, 1900, 3000, 5000, 2300, 2100, 2200], // Example data
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Weekly Sales',
    },
  },
  scales: {
    x: {
      barPercentage: 0.5, 
      categoryPercentage: 0.5,
    },
    y: {
      beginAtZero: true,
    },
  },
};

// Data for Online Users
const onlineUsersChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Example labels
  datasets: [
    {
      label: 'Online Users',
      data: [50, 60, 70, 80, 90, 100, 110], // Example data
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const onlineUsersChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Online Users',
    },
  },
  scales: {
    x: {
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    y: {
      beginAtZero: true,
    },
  },
};

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Recent Customers</h2>
          <ul className="flex flex-wrap justify-center">
            {recentCustomers.map(customer => (
              <li key={customer.id} className="flex flex-col items-center m-2">
                <img
                  src={customer.profilePhoto}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <div className="text-center">
                  <strong>{customer.name}</strong>
                  <p className="text-sm text-gray-500">${customer.totalPurchase}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Weekly Sales</h2>
          <div className="flex flex-row items-center justify-between h-3/4">
            <div className="text-center pr-1">
              {/* <p className="text-xs mb-1/2">{salesDetails.fromDate} - {salesDetails.toDate}</p> */}
              <p className="text-xl font-bold mb-1">${salesDetails.salesNumber}</p>
              <p className="text-xs">{salesDetails.percentageIncrease}% increase</p>
            </div>
            <div className="flex-grow origin-bottom pr-4" style={{ height: '150px'}}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Store Overview</h2>
          <div className='flex flex-col items-center justify-around h-3/4'>
          <p>Total number of products in the store: <b>124</b></p>
          <div className="flex justify-center mt-2">
            <button onClick={handleAddNew} className="bg-myblue hover:bg-myyellow text-mywhite font-bold py-2 px-4 rounded">
              Add New Product
            </button>
          </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-4 mt-4">
  <div className="col-span-2 sm:col-span-3 bg-white border border-gray-300 p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-2">Today Orders</h2>
    <p className="text-sm">Details about today's orders...</p>
  </div>
  <div className="col-span-1 sm:col-span-3 bg-white border border-gray-300 p-4 rounded-lg flex">
  <div className="flex-grow-0 flex flex-col justify-end pl-6 pr-6" style={{ width: '1.5rem' }}>
      <h2 className="text-2xl font-bold mb-2 transform -rotate-90 origin-bottom-left whitespace-nowrap text-center pl-8">Online Users</h2>
    </div>
    <div className="flex-grow flex flex-col">
    <div className="flex-grow origin-bottom pr-4" style={{ height: '200px'}}>
        <Bar data={onlineUsersChartData} options={onlineUsersChartOptions} />
      </div>
      <div className="mt-1 text-center">
        <p className="text-lg font-semibold">{currentOnlineUsers} users currently online</p>
      </div>
    </div>
  </div>
  <div className="col-span-1 sm:col-span-1 bg-white border border-gray-300 p-4 rounded-lg flex">
  <div className="flex-grow-0 flex flex-col justify-end pl-6 pr-0" style={{ width: '1.5rem' }}>
      <h2 className="text-2xl font-bold mb-2 transform -rotate-90 origin-bottom-left whitespace-nowrap text-center pl-2">New vs Returning</h2>
    </div>
    <div className="flex-grow flex flex-col align-center pl-0">
    <div className="ml-4 text-center">
    <h2 className="text-s font-bold mb-2"><i>Returns</i></h2>
      <p className="text-xl font-semibold mb-1 text-mynavy"><b>13.3K</b></p>
      <div className="flex items-center text-center pl-2">
        <p className="text-xs text-mygreen">+10%</p>
        <span className="text-mygreen mr-1">&#9650;</span>
      </div>
    <hr className="my-4 border-gray-200 items-center pl-10"/>
    </div>
    <div className="ml-4 text-center pr-2">
      <h2 className="text-s font-bold mb-2"><i>New</i></h2>
      <p className="text-xl font-semibold mb-1 text-mynavy"><b>4.1K</b></p>
      <div className="flex items-center text-center pl-2">
        <p className="text-xs text-mygreen">+5%</p>
        <span className="text-mygreen mr-1">&#9650;</span>
      </div>
  </div>
  </div>
  </div>
  <div className="col-span-1 sm:col-span-1 bg-white border border-gray-300 p-4 rounded-lg flex">
  <div className="flex-grow-0 flex flex-col justify-end pl-6 pr-0" style={{ width: '1.5rem' }}>
      <h2 className="text-2xl font-bold mb-2 transform -rotate-90 origin-bottom-left whitespace-nowrap text-center pl-4">Checkout Status</h2>
    </div>
    <div className="flex-grow flex flex-col align-center pl-0">
    <div className="ml-4 text-center pr-4 pl-0 mb-2">
    <h2 className="text-xs font-bold mb-2 pr-2"><i>Completed</i></h2>
      <p className="text-xl font-semibold mb-1 text-mynavy pr-2"><b>981</b></p>
      <div className="flex items-center text-center pl-2">
        <p className="text-xs text-mygreen">+14%</p>
        <span className="text-mygreen mr-1">&#9650;</span>
      </div>
    <hr className="my-4 border-gray-200 items-center pl-10"/>
    </div>
    <div className="ml-4 text-center pr-4">
      <h2 className="text-xs font-bold mb-2"><i>Abandoned</i></h2>
      <p className="text-xl font-semibold mb-1 text-mynavy pr-2"><b>654</b></p>
      <div className="flex items-center text-center pl-2">
        <p className="text-xs text-myred">+21%</p>
        <span className="text-myred mr-1">&#9650;</span>
      </div>
  </div>
  </div>
  </div>
</div>
</div>
  );
}

export default Dashboard;
