import { useRef, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Signature from "../components/Signature.jsx"
import orderService from "../services/orders.js"

function ViewOrder({ orderId }) {
  const navigate = useNavigate()
  const sigCanvas = useRef(null)
  const clearCanvas = () => sigCanvas.current.clear()
  const [order, setOrder] = useState(null)
  useEffect(() => {
    orderService.get(orderId).then(res => setOrder(res))
  })

  const markOrderAsFulfilled = () => {
    const newOrder = {
      ...order,
      status: 'delivered',
      signature: {
        img: sigCanvas.current.toDataURL('image/png'),
        timestamp: (new Date).toString()
      }
    }
    orderService.update(newOrder).then(() => navigate(`/`))
  }

  if (!order) return null

  return (
    <>
      <button><Link to="/">Go back to index</Link></button>
      <h1>DO No. {order.doNo}</h1>
      <button><Link to={`/order/edit/${orderId}`}>Edit</Link></button>
      <h2>{order.companyName}</h2>
      <div><b>Status: </b>{order.status}</div>
      { order.status === 'delivered'
        ? (
          <div><b>Date Delivered: </b>{order.dateDelivered}</div>
        ) : (
          <div><b>Deliver By: </b>{order.deliverBy}</div>
        )
      }
      <div><b>Deliver to: </b> {order.deliverTo}</div>
      <div><b>Contact: </b> {order.contact}</div>
      <div><b>Attendedy By: </b> {order.attendedBy}</div>
      { order.model ? <div><b>Model: </b> {order.model}</div> : null}
      { order.serialNumber ? <div><b>Serial Number: </b> {order.serialNumber}</div> : null}
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          {order.items.map((item, index) =>
            <thead key={item.id}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.content}</td>
                <td>{item.qty}</td>
                <td>{item.price ? item.price : '-'}</td>
                <td>-</td>
              </tr>
            </thead>
          )}
        </table>
      </div>
      <h3 style={{marginBottom: "0px"}}>Signature</h3>
      {
        order.status === 'unfulfilled'
          ? <>
              <Signature sigCanvas={sigCanvas} clearCanvas={clearCanvas}/>
              <button onClick={markOrderAsFulfilled}
              >Mark as sent</button>
            </>
          : <div><img src={order.signature.img}/></div>
      }
    </>
  )
}

export default ViewOrder