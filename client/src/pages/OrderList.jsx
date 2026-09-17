import OrderCard from "../components/OrderCard"
import { useNavigate, Link } from "react-router-dom"
import orderService from "../services/orders"
import { useState, useEffect } from "react"

function OrderList() {
  const [orders, setOrders] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    orderService
      .getAll()
      .then(res => setOrders(res))
  }, [])

  if (!orders) return null

  return (
    <div>
      <h2>DOs</h2>
      <button><Link to="/order/edit/">New DO</Link></button>
      {orders.map(order =>
        <div key={order.doNo} id={order.doNo} onClick={() => navigate(`/order/${order.id}`)} className='order-list-item' style={{width: "400px"}} >
          <OrderCard order={order} />
        </div>
      )}
    </div>
  )
}

export default OrderList