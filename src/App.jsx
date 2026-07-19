import Signature from './components/Signature.jsx'
import { useState, useRef } from 'react'

const initalItems = [
  {
    id: crypto.randomUUID(),
    content: 'line item 0',
    qty: 1,
    price: '',
  },
  {
    id: crypto.randomUUID(),
    content: 'line item 1',
    qty: 1,
    price: '',
  },
  {
    id: crypto.randomUUID(),
    content: 'line item 2',
    qty: 1,
    price: '',
  },
]

function App() {
  const [ orderDetails, setOrderDetails ] = useState({
    date: '',
    companyName: 'sample',
    deliverTo: 'test address',
    contact: '453983745'
  })

  const [ lineItems, setLineItems ] = useState(initalItems)
  const sigCanvas = useRef(null)

  // I genuinely cannot think of a nicer way to do this
  const handleLineItemChange = e => {
    if (e.target.id.substring(0, 3) === 'con') {
      setLineItems(lineItems.map(lineItem =>lineItem.id === e.target.id.substring(4) ? {...lineItem, content: e.target.value} : lineItem))
    }
    else if (e.target.id.substring(0, 3) === 'qty') {
      setLineItems(lineItems.map(lineItem =>lineItem.id === e.target.id.substring(4) ? {...lineItem, qty: e.target.value} : lineItem))
    }
    else if (e.target.id.substring(0, 3) === 'prc') {
      setLineItems(lineItems.map(lineItem =>lineItem.id === e.target.id.substring(4) ? {...lineItem, price: e.target.value} : lineItem))
    }
    else {
      throw new Error('Something has gone VERY wrong with handling line item inputs')
    }
  }

  const handleDetailsChange = e => {
    if (e.target.id === 'date') setOrderDetails({...orderDetails, date: e.target.value})
    if (e.target.id === 'companyName') setOrderDetails({...orderDetails, companyName: e.target.value})
    if (e.target.id === 'deliverTo') setOrderDetails({...orderDetails, deliverTo: e.target.value})
    if (e.target.id === 'contact') setOrderDetails({...orderDetails, contact: e.target.value})
  }

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

  const saveOrder = () => {
    const order = {
      ...orderDetails,
      items: lineItems,
      signature: sigCanvas.current.toDataURL('image/png')
    }

    console.log(order)
  }

  return (
    <>
      <div>
        Date: <input value={orderDetails.date} id='date' onChange={handleDetailsChange} className='lineItem' type='date'></input>
      </div>
      <div>
        Company Name: <input value={orderDetails.companyName} id='companyName' onChange={handleDetailsChange} className='lineItem'></input>
      </div>
      <div>
        Deliver to: <input value={orderDetails.deliverTo} id='deliverTo' onChange={handleDetailsChange} className='lineItem'></input>
      </div>
      <div>
        Contact: <input value={orderDetails.contact} id='contact' onChange={handleDetailsChange} className='lineItem'></input>
      </div>
      <div>
        {lineItems.map(lineItem => {
          return (
            <div key={lineItem.id}>
              <input value={lineItem.content} id={'con-'+lineItem.id} onChange={handleLineItemChange} className='lineItem'></input>
              <input value={lineItem.qty} id={'qty-'+lineItem.id} onChange={handleLineItemChange} className='lineItemSmall'></input>
              <input value={lineItem.price} id={'prc-'+lineItem.id} onChange={handleLineItemChange} type='number' className='lineItemSmall'></input>
              <button onClick={deleteLineItem} id={lineItem.id}>Delete</button>
            </div>
          )
        })}
      </div>
      <button onClick={addLineItem}>Add line item</button>
      <Signature sigCanvas={sigCanvas}/>
      <button onClick={saveOrder}>Save Order</button>
    </>
  )
}

export default App
