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
  const [salesDetails, setSalesDetails] = useState({
    fromDate: '2023-07-01',
    toDate: '2023-07-07',
    salesNumber: 5000,
    percentageIncrease: 10
  });

  // Simulate fetching recent customers and weekly sales (dummy data)
  useEffect(() => {
    // Fetch Recent Customers
    const fetchRecentCustomers = async () => {
      // Example of fetching data (dummy data for demonstration)
      const dummyCustomers: Customer[] = [
        { id: 1, name: 'John Doe', dateJoined: '2023-07-08', profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg', totalPurchase: 1200 },
        { id: 2, name: 'Jane Smith', dateJoined: '2023-07-07', profilePhoto: 'https://randomuser.me/api/portraits/women/1.jpg', totalPurchase: 1500 },
        { id: 3, name: 'Michael Johnson', dateJoined: '2023-07-06', profilePhoto: 'https://randomuser.me/api/portraits/men/2.jpg', totalPurchase: 900 },
        // Add more dummy customers as needed
      ];

      // Set the recent customers in state
      setRecentCustomers(dummyCustomers);
    };

    // Fetch Weekly Sales
    const fetchWeeklySales = async () => {
      // Example of fetching data (dummy data for demonstration)
      const weeklySalesData: number = 5000; // Example weekly sales amount

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

  // Data for the bar chart
  const barChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5000, 2300, 2100, 2200], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Sales',
      },
    },
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div className="text-center">
              <p className="text-xs mb-1">{salesDetails.fromDate} - {salesDetails.toDate}</p>
              <p className="text-3xl font-bold mb-1">${salesDetails.salesNumber}</p>
              <p className="text-s">{salesDetails.percentageIncrease}% increase</p>
            </div>
            <div className="w-1/2">
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
    </div>
  );
}

export default Dashboard;
