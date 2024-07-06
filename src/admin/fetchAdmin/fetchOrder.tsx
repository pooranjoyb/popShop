import {supabase} from "../../utils/client"

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

export const fetchOrders = async (): Promise<Order[]> => {
  let { data, error } = await supabase
    .from('orders')
    .select('*')

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data || []
}