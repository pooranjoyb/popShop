import Table from "../components/Table";
import {fetchOrders} from "./fetchAdmin/fetchOrder";
import { useEffect } from "react";
import { useState } from "react";
import DisplayOrders from "./fetchAdmin/DisplayOrders"


interface Product {
  desc: string
  image: string
  name: string
  price: number
  quantity: number
  rating: number
}

interface items {
  date: string
  orderId: string
  phone: number
  price: number
  product: Product[]
  status: string
  username: string
}

const Orders: React.FC = () => {
  const [orderStore, setOrderStore] = useState<items[]>([])
  useEffect(() => {
    const getOrders = async () => {``
      const ordersData = await fetchOrders();
      setOrderStore(ordersData);
    }
      getOrders();
  },[])
  console.log(orderStore);
  return (
    <div>
      <Table />
      <DisplayOrders orders={orderStore}/>
    </div>
  )
}

export default Orders;
