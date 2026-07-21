import { useRef } from "react"
import Signature from "../components/Signature.jsx"

function ViewOrder(props) {
  const {orderDetails, lineItems, setCurrentPage, markOrderAsFulfilled} = props
  const sigCanvas = useRef(null)

  const clearCanvas = () => sigCanvas.current.clear()

  return (
    <>
      <button onClick={() => setCurrentPage('index')}>Go back to index</button>
      <h1>DO No. {orderDetails.doNo}</h1>
      <button onClick={() => setCurrentPage('EditOrder')}>Edit</button>
      <h2>{orderDetails.companyName}</h2>
      <div><b>Status: </b>{orderDetails.status}</div>
      <div><b>Delivery date: </b>{orderDetails.date}</div>
      <div><b>Deliver to: </b> {orderDetails.deliverTo}</div>
      <div><b>Contact: </b> {orderDetails.contact}</div>
      <div><b>Attendedy By: </b> {orderDetails.attendedBy}</div>
      { orderDetails.model ? <div><b>Model: </b> {orderDetails.model}</div> : null}
      { orderDetails.serialNumber ? <div><b>Serial Number: </b> {orderDetails.serialNumber}</div> : null}
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
          {lineItems.map((item, index) =>
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
        orderDetails.status === 'unfulfilled'
          ? <>
              <Signature sigCanvas={sigCanvas} clearCanvas={clearCanvas}/>
              <button onClick={() => {
                markOrderAsFulfilled(orderDetails, lineItems, sigCanvas)
                setCurrentPage('index')
              }}
              >Mark as sent</button>
            </>
          : null
      }
      <div>
        {
          orderDetails.status === 'delivered' || orderDetails.status ===  'invoiced'
            ? <img src={orderDetails.signature.img}/>
            : null
        }
      </div>
    </>
  )
}

export default ViewOrder