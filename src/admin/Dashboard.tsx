import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { supabase } from "../utils/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Customer {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: number;
  createdAt: string; // Adjust according to the format you receive
  profilepicture: string;
}

interface SupabaseCountResponse {
  count: number;
  error: Error | null;
}
function Dashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);
  const fetchProductsCount = async () => {
    try {
      // Fetch the count of products from the product_table
      const { count, error } = await supabase
        .from("Product_table")
        .select("*", { count: "exact" });

      if (error) throw error;
      setProductsCount(count ?? 0); 
    } catch (error) {
      console.error("Error fetching products count:", error);
    }
  };
  const currentOnlineUsers = 78;
  const salesDetails = {
    fromDate: "2023-01",
    toDate: "2023-07",
    salesNumber: 5000,
    percentageIncrease: 10
  };

  // Fetch Recent Customers
  const fetchRecentCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(
          " email, username, firstname, lastname, phone, createdAt, profilepicture"
        )
        .order("createdAt", { ascending: true }) // or any column you'd like to order by
        .limit(3); // Fetching the most recent 3 customers

      if (error) throw error;

      // Update the state with fetched data
      setRecentCustomers(data as Customer[]);
      console.log("recent", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchRecentCustomers();
    fetchProductsCount();
  }, []);

  const handleAddNew = () => {
    // Handle adding a new item action here
    console.log("Add New button clicked!");
  };

  // Data for the Weekly Sales
  const barChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [1200, 1900, 3000, 5000, 2300, 2100, 2200],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  // Data for Online Users
  const onlineUsersChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Online Users",
        data: [50, 60, 70, 80, 90, 100, 110],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };

  const onlineUsersChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  // Data for Historical Sales
  const historicalSalesChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [3000, 2500, 4000, 4500, 4800, 5000, 5500],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1
      }
    ]
  };

  const historicalSalesChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Recent Customers</h2>
          <ul className="flex flex-wrap justify-center">
            {recentCustomers.map((customer) => (
              <li
                key={customer.email}
                className="flex flex-col items-center m-2"
              >
                <img
                  src={
                    customer.profilepicture
                      ? customer.profilepicture
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={`${customer.firstname} ${customer.lastname}`}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <div className="text-center">
                  <strong>{customer.username}</strong>
                  <p className="text-sm text-gray-500">${customer.phone}</p>
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
              <p className="text-xl font-bold mb-1">
                ${salesDetails.salesNumber}
              </p>
              <p className="text-xs">
                {salesDetails.percentageIncrease}% increase
              </p>
            </div>
            <div
              className="flex-grow origin-bottom pr-4"
              style={{ height: "150px" }}
            >
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Store Overview</h2>
          <div className="flex flex-col items-center justify-around h-3/4">
            <p>
              Total number of products in the store: <b>{productsCount}</b>
            </p>
            <div className="flex justify-center mt-2">
              <button
                onClick={handleAddNew}
                className="bg-myblue hover:bg-myyellow text-mywhite font-bold py-2 px-4 rounded"
              >
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-4 mt-4">
        <div className="col-span-2 sm:col-span-3 bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-8">Today Orders</h2>
          <p className="text-sm mb-2">{currentDate}</p>
          <p className="text-3xl font-bold mb-4">$ 450K</p>
          <hr className="mb-4" />
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-lg">&#x1F4C5;</p>
              <p className="text-sm">Sold</p>
              <p className="text-lg font-semibold">1500</p>
            </div>
            <div className="text-center">
              <p className="text-lg">&#x1F4C8;</p>
              <p className="text-sm">Returns</p>
              <p className="text-lg font-semibold">100</p>
            </div>
            <div className="text-center">
              <p className="text-lg">&#x1F4C1;</p>
              <p className="text-sm">Picked</p>
              <p className="text-lg font-semibold">1400</p>
            </div>
            <div className="text-center">
              <p className="text-lg">&#x1F6E0;</p>
              <p className="text-sm">In Transit</p>
              <p className="text-lg font-semibold">200</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-3 bg-white border border-gray-300 p-4 rounded-lg flex">
          <div
            className="flex-grow-0 flex flex-col justify-end pl-6 pr-6"
            style={{ width: "1.5rem" }}
          >
            <h2 className="text-2xl font-bold mb-2 transform -rotate-90 origin-bottom-left whitespace-nowrap text-center pl-8">
              Online Users
            </h2>
          </div>
          <div className="flex-grow flex flex-col">
            <div
              className="flex-grow origin-bottom pr-4"
              style={{ height: "200px" }}
            >
              <Bar
                data={onlineUsersChartData}
                options={onlineUsersChartOptions}
              />
            </div>
            <div className="mt-1 text-center">
              <p className="text-lg font-semibold">
                {currentOnlineUsers} users currently online
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 bg-white border border-gray-300 p-4 rounded-lg flex">
          <div
            className="flex-grow-0 flex flex-col justify-end pl-6 pr-0"
            style={{ width: "1.5rem" }}
          >
            <h2 className="text-2xl font-bold mb-2 transform -rotate-90 origin-bottom-left whitespace-nowrap text-center pl-2">
              New vs Returning
            </h2>
          </div>
          <div className="flex-grow flex flex-col align-center pl-0">
            <div className="ml-4 text-center">
              <h2 className="text-s font-bold mb-2">
                <i>Returns</i>
              </h2>
              <p className="text-xl font-semibold mb-1 text-mynavy">
                <b>13.3K</b>
              </p>
              <div className="flex items-center text-center pl-2">
                <p className="text-xs text-mygreen">+10%</p>
                <span className="text-mygreen mr-1">&#9650;</span>
              </div>
              <hr className="my-4 border-gray-200 items-center pl-10" />
            </div>
            <div className="ml-4 text-center pr-2">
              <h2 className="text-s font-bold mb-2">
                <i>New</i>
              </h2>
              <p className="text-xl font-semibold mb-1 text-mynavy">
                <b>4.1K</b>
              </p>
              <div className="flex items-center text-center pl-2">
                <p className="text-xs text-mygreen">+5%</p>
                <span className="text-mygreen mr-1">&#9650;</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 bg-white border border-gray-300 p-4 rounded-lg flex">
          <div
            className="flex-grow-0 flex flex-col justify-end pl-6 pr-0"
            style={{ width: "1.5rem" }}
          >
            <h2 className="text-2xl font-bold mb-2 transform -rotate-90 origin-bottom-left whitespace-nowrap text-center pl-4">
              Checkout Status
            </h2>
          </div>
          <div className="flex-grow flex flex-col align-center pl-0">
            <div className="ml-4 text-center pr-4 pl-0 mb-2">
              <h2 className="text-xs font-bold mb-2 pr-2">
                <i>Completed</i>
              </h2>
              <p className="text-xl font-semibold mb-1 text-mynavy pr-2">
                <b>981</b>
              </p>
              <div className="flex items-center text-center pl-2">
                <p className="text-xs text-mygreen">+14%</p>
                <span className="text-mygreen mr-1">&#9650;</span>
              </div>
              <hr className="my-4 border-gray-200 items-center pl-10" />
            </div>
            <div className="ml-4 text-center pr-4">
              <h2 className="text-xs font-bold mb-2">
                <i>Abandoned</i>
              </h2>
              <p className="text-xl font-semibold mb-1 text-mynavy pr-2">
                <b>654</b>
              </p>
              <div className="flex items-center text-center pl-2">
                <p className="text-xs text-myred">+21%</p>
                <span className="text-myred mr-1">&#9650;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 sm:col-span-1 bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Historical Sales Stats</h2>
          <div className="flex items-center mb-6">
            <div className="mb-4">
              <p>
                <span role="img" aria-label="money bag">
                  💰
                </span>{" "}
                <b>Total Sales:</b> $34,500
              </p>
              <p>
                <span role="img" aria-label="chart">
                  📊
                </span>{" "}
                <b>Average Sales per Month:</b> $4,928
              </p>
              <p>
                <span role="img" aria-label="trophy">
                  🏆
                </span>{" "}
                <b>Highest Sales Month:</b> July
              </p>
            </div>
          </div>
          <div className="mb-4">
            <Bar
              data={historicalSalesChartData}
              options={historicalSalesChartOptions}
            />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Daily Sales Summary</h2>
          <div className="flex items-center mb-4">
            <label className="mr-2">From:</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
            />
            <label className="ml-4 mr-2">To:</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-lg">&#x1F4C5;</p>
              <p className="text-sm">Minimum Sales</p>
              <p className="text-lg font-semibold">1500</p>
            </div>
            <div className="text-center">
              <p className="text-lg">&#x1F4C8;</p>
              <p className="text-sm">Maximum Sales</p>
              <p className="text-lg font-semibold">5000</p>
            </div>
            <div className="text-center">
              <p className="text-lg">&#x1F4C1;</p>
              <p className="text-sm">Average Sales</p>
              <p className="text-lg font-semibold">3200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
