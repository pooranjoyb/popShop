import Table from "../components/Table";
import {supabase} from "../utils/client";
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

 const fetchOrders = async (): Promise<items[]> => {
  let { data, error } = await supabase
    .from('orders')
    .select('*')

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data || []
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
