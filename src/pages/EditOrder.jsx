import InputField from "../components/InputField.jsx"
import InputLineItems from "../components/InputLineItems.jsx"
import orderService from "../services/orders.js"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function EditOrder({ orderId }) {
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (orderId) {
      orderService.get(orderId).then(res => setOrder(res))
    } else {
      orderService.getLastOrder().then(res => {
        const newId = Number(res.doNo) + 1
        setOrder({
          doNo: newId.toString().padStart(4, "0"),
          status: "unfulfilled",
          date: "",
          companyName: "",
          deliverTo: "",
          contact: "",
          attendedBy: "",
          model: "",
          serialNumber: "",
          items: [
            {
              id: crypto.randomUUID(),
              content: "",
              qty: "",
              price: ""
            }
          ],
          signature: {
            img: "",
            timestamp: ""
          },
        })
      })
    }
  }, [])
  if (!order) return null

  const onChange = ({target}) => setOrder({ ...order, [target.id]: target.value })

  const saveOrder = () => {
    if (orderId) {
      orderService.update(order).then(() => navigate(`/order/${orderId}`))
    } else {
      orderService.create(order).then(res => navigate(`/order/${res.id}`))
    }
  }

  return (
    <>
      <button><Link to="/">Go back to index</Link></button>
      <h1>DO No. {order.doNo}</h1>
      <InputField
        label='Date'
        id='date'
        value={order.date}
        type='date'
        onChange={onChange}
      />
      <InputField
        label='Company Name'
        value={order.companyName}
        id='companyName'
        onChange={onChange}
      />
      <InputField
        label='Deliver to'
        value={order.deliverTo}
        id='deliverTo'
        onChange={onChange}
      />
      <InputField
        label='Contact'
        value={order.contact}
        id='contact'
        onChange={onChange}
      />
      <InputField
        label='Attended By'
        value={order.attendedBy}
        id='attendedBy'
        onChange={onChange}
      />
      <InputField
        label='Model'
        value={order.model}
        id='model'
        onChange={onChange}
      />
      <InputField
        label='S/N'
        value={order.serialNumber}
        id='serialNumber'
        onChange={onChange}
      />

      <InputLineItems
        order={order}
        setOrder={setOrder}
      />

      <div>
        <button onClick={saveOrder}>
          {order.status === 'new' ? 'Create Order' : 'Save Order'}
        </button>
      </div>
    </>
  )
}

export default EditOrder