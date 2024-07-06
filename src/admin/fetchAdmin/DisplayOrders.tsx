import React from 'react'

interface Product {
  desc: string
  image: string
  name: string
  price: number
  quantity: number
  rating: number
}

interface Order {
  date: string
  orderId: string
  phone: number
  price: number
  product: Product[]
  status: string
  username: string
}

interface DisplayOrdersProps {
  orders: Order[]
}

const DisplayOrders: React.FC<DisplayOrdersProps> = ({ orders }) => {
  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="hover">
              <th>Date</th>
              <th>Order ID</th>
              <th>Phone</th>
              <th>Price</th>
              <th>Status</th>
              <th>Username</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => 
              <tr key={order.orderId} className="hover">
                <td >{order.date}</td>
                <td >{order.orderId}</td>
                <td >{order.phone}</td>
                <td >{order.price}</td>
                <td >{order.status}</td>
                <td >{order.username}</td>
                <td >
                  <div >
                    {order.product.map((product, index) => (
                      <div key={index} >
                        <div >
                          <div>
                            <p style={{marginTop: "5px"}}>{product.name}</p>
                            <p >{product.desc}</p>
                          </div>
                        </div>
                        <div>
                          <p >Price: ${product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Rating: {product.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayOrders