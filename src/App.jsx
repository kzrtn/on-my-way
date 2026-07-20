import { useState, useRef } from 'react'
import Signature from './components/Signature.jsx'
import InputField from './components/InputField.jsx'
import InputLineItems from './components/InputLineItems.jsx'

import dayjs from "dayjs"

const initialListOfOrders = [{
  doNo: '0001',
  status: 'unfulfilled',
  date: dayjs((new Date).toLocaleDateString()).format('YYYY-MM-DD'),
  companyName: 'Test company 1',
  deliverTo: 'Company 1 HQ Address',
  contact: 'Person 12345678',
  attendedBy: 'ZHANG',
  model: '100Bar',
  serialNumber: '202001232',
  items: [{
    id: crypto.randomUUID(),
    content: 'Service & repair 100bar waterjet',
    qty: 1,
    price: '',
  }, {
    id: crypto.randomUUID(),
    content: 'New Pump 11.20',
    qty: 1,
    price: '',
  }],
  signature: {
    img: 'somerandomhashshouldbehere',
    timestamp: (new Date).toString()
  }
},{
  doNo: '0002',
  status: 'unfulfilled',
  date: dayjs((new Date).toLocaleDateString()).format('YYYY-MM-DD'),
  companyName: 'Test Company 2',
  deliverTo: 'Blk 123 Somewhere Rd',
  contact: '987654321',
  attendedBy: 'Lee',
  model: '',
  serialNumber: '',
  items: [{
    id: crypto.randomUUID(),
    content: 'High Pressure Hose',
    qty: 1,
    price: '',
  }],
  signature: {
    img: 'imagehashshouldbehere',
    timestamp: (new Date).toString()
  }
},{
  doNo: '0003',
  status: 'unfulfilled',
  date: dayjs((new Date).toLocaleDateString()).format('YYYY-MM-DD'),
  companyName: 'Company 3',
  deliverTo: 'Somewhere\'s address',
  contact: 'Person contact 123',
  attendedBy: 'Zhang',
  model: '',
  serialNumber: '',
  items: [{
    id: crypto.randomUUID(),
    content: 'Hose repair',
    qty: 5,
    price: '',
  }, {
    id: crypto.randomUUID(),
    content: 'High Pressure Nipple',
    qty: 3,
    price: '',
  },{
    id: crypto.randomUUID(),
    content: 'High Pressure Coupling',
    qty: 2,
    price: '',
  },{
    id: crypto.randomUUID(),
    content: 'Ball Valve 1/4"',
    qty: 1,
    price: '',
  }],
  signature: {
    img: 'imagehashshouldbehere',
    timestamp: (new Date).toString()
  }
}
]

const initalItems = [
  {
    id: crypto.randomUUID(),
    content: 'line item 0',
    qty: 1,
    price: '',
  },
]

const newDONo = listOfOrders => {
  const lastDO = listOfOrders.reduce((max, order) => max > Number(order.doNo) ? max : Number(order.doNo), 0)
  return (lastDO+1).toString().padStart(4, '0')
}


function App() {
  const [ listOfOrders, setListOfOrders ] = useState(initialListOfOrders)
  const [ orderDetails, setOrderDetails ] = useState({
    doNo: newDONo(listOfOrders),
    status: 'new',
    date: dayjs((new Date).toLocaleDateString()).format('YYYY-MM-DD'),
    companyName: '',
    deliverTo: '',
    contact: '',
    attendedBy: '',
    model: '',
    serialNumber: '',
  })
  const [ lineItems, setLineItems ] = useState(initalItems)
  const sigCanvas = useRef(null)

  const LINE_ITEM_PREFIXES = {
    con: 'content',
    qty: 'qty',
    prc: 'price'
  }

  const createNewOrder = () => {
    setOrderDetails({
      doNo: newDONo(listOfOrders),
      status: 'new',
      date: dayjs((new Date).toLocaleDateString()).format('YYYY-MM-DD'),
      companyName: '',
      deliverTo: '',
      contact: '',
      attendedBy: '',
      model: '',
      serialNumber: '',
    })
    setLineItems(initalItems)
  }
  
  const handleLineItemChange = e => {
    const prefix = e.target.id.substring(0, 3)
    const key = LINE_ITEM_PREFIXES[prefix]
    if (!key) throw new Error('Something has gone VERY wrong with handling line item inputs')

    setLineItems(lineItems.map(lineItem =>
      lineItem.id === e.target.id.substring(4)
      ? {...lineItem, [key]: e.target.value}
      : lineItem
    ))
  }

  const handleDetailsChange = e =>
    setOrderDetails({...orderDetails, [e.target.id]: e.target.value})

  const addLineItem = () => {
    setLineItems(lineItems.concat({
      id: crypto.randomUUID(),
      content: 'new line',
      qty: 1,
      price: ''
    }))
  }

  const deleteLineItem = e => {
    setLineItems(lineItems.filter(lineItem => lineItem.id !== e.target.id))
  }

  const clearCanvas = () => sigCanvas.current.clear()

  const saveOrder = () => {
    if (orderDetails.status === 'new') {
      const newOrder = {
        ...orderDetails,
        status: 'unfulfilled',
        items: lineItems,
        signature: {
          img: null,
          timestamp: null
        }
      }
      setListOfOrders(listOfOrders.concat(newOrder))
      //createNewOrder()
    } else {
    const newOrder = {
      ...orderDetails,
      items: lineItems
    }
    setListOfOrders(listOfOrders.map(order => order.doNo === newOrder.doNo ? newOrder : order))
    createNewOrder()
    clearCanvas()
  }}

  const loadOrder = e => {
    const clickedOrder = listOfOrders.find(order => order.doNo === e.target.id)
    setOrderDetails(clickedOrder)
    setLineItems(clickedOrder.items)
  }

  const markAsFulfilled = () => {
    const newOrder = {
      ...orderDetails,
      status: 'delivered',
      items: lineItems,
      signature: {
        img: sigCanvas.current.toDataURL('image/png'),
        timestamp: (new Date).toString()
      }
    }
    console.log(newOrder)
    setListOfOrders(listOfOrders.map(order => order.doNo === newOrder.doNo ? newOrder : order))
    createNewOrder()
    clearCanvas()
  }

  return (
    <>
      <h1>DO No. {orderDetails.doNo}</h1>
      <button onClick={createNewOrder}>New DO</button>
      <InputField label='date' id='date' value={orderDetails.date} type='date' onChange={handleDetailsChange} />
      <InputField label='Company Name' value={orderDetails.companyName} id='companyName' onChange={handleDetailsChange} />
      <InputField label='Deliver to' value={orderDetails.deliverTo} id='deliverTo' onChange={handleDetailsChange} />
      <InputField label='Contact' value={orderDetails.contact} id='contact' onChange={handleDetailsChange} />
      <InputField label='Attended By' value={orderDetails.attendedBy} id='attendedBy' onChange={handleDetailsChange} />
      <InputField label='Model' value={orderDetails.model} id='model' onChange={handleDetailsChange} />
      <InputField label='S/N' value={orderDetails.serialNumber} id='serialNumber' onChange={handleDetailsChange} />
      <InputLineItems lineItems={lineItems} onChange={handleLineItemChange} onDelete={deleteLineItem} onAdd={addLineItem} />
      {orderDetails.status === 'unfulfilled' ? <Signature sigCanvas={sigCanvas} clearCanvas={clearCanvas}/> : null}
      <div>{orderDetails.status === 'delivered' ? <img src={orderDetails.signature.img}/> : null}</div>
      <div>
        <button onClick={saveOrder}>Save Order</button>
        {orderDetails.status === 'unfulfilled' ? <button onClick={markAsFulfilled}>Mark as sent</button> : null}
      </div>
      <div>
        <h2>DOs</h2>
        {listOfOrders.map(order =>
          <div key={order.doNo} id={order.doNo} onClick={loadOrder} className='order-list-item'>
            {order.date}, DO {order.doNo}, {order.companyName}, {order.status}
          </div>)}
      </div>
    </>
  )
}

export default App
