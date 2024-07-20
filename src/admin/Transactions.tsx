import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';
import { Product } from '../pages/Orders/ReturnExchangePopup';

// Define the interface for transaction data
interface Transaction {
  transactionId: string;
  username: string;
  phone: string;
  price: number;
  date: string;
  product: Product[]; // Assuming this is an array of products
  status: string;
}

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*');

      if (error) {
        console.error('Error fetching transactions:', error);
        setError('Failed to fetch transactions.');
      } else {
        console.log('Fetched transactions:', data);
        setTransactions(data || []);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="overflow-x-auto mt-4">
      {error && <p className="text-red-500 text-center mb-4 mt-4">{error}</p>}
      <table className="table w-full text-left bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Transaction ID</th>
            <th className="p-3">Username</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Price</th>
            <th className="p-3">Date</th>
            <th className="p-3">Product</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId} className="border-gray-200">
              <td className="p-3">{transaction.transactionId}</td>
              <td className="p-3">{transaction.username}</td>
              <td className="p-3">{transaction.phone}</td>
              <td className="p-3">₹{transaction.price.toFixed(2)}</td>
              <td className="p-3">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="p-3 flex items-center space-x-2">
                {transaction.product.length > 0 ? (
                  <>
                    <img
                      src={transaction.product[0].image}
                      alt={transaction.product[0].name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{transaction.product[0].name}</p>
                      <p>${transaction.product[0].price.toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <p>No Product</p>
                )}
              </td>
              <td className="p-3 capitalize">{transaction.status == "pending" ? <span className='bg-myyellow p-2 font-semibold rounded-md text-mywhite'>{transaction.status}</span> : <span className='bg-mygreen p-2 rounded-md text-mywhite font-semibold'>{transaction.status}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
