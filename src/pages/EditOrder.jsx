import InputField from "../components/InputField.jsx"
import InputLineItems from "../components/InputLineItems.jsx"

function EditOrder(props) {
  const {orderDetails, setOrderDetails, lineItems, setLineItems, setCurrentPage, saveOrder} = props
  const handleDetailsChange = e =>
    setOrderDetails({...orderDetails, [e.target.id]: e.target.value})

  return (
    <>
      <button onClick={() => setCurrentPage('index')}>Go back to index</button>
      <h1>DO No. {orderDetails.doNo}</h1>
      <InputField
        label='Date'
        id='date'
        value={orderDetails.date}
        type='date'
        onChange={handleDetailsChange}
      />
      <InputField
      label='Company Name'
      value={orderDetails.companyName}
      id='companyName'
      onChange={handleDetailsChange}
      />
      <InputField
      label='Deliver to'
      value={orderDetails.deliverTo}
      id='deliverTo'
      onChange={handleDetailsChange}
      />
      <InputField
      label='Contact'
      value={orderDetails.contact}
      id='contact'
      onChange={handleDetailsChange}
      />
      <InputField
      label='Attended By'
      value={orderDetails.attendedBy}
      id='attendedBy'
      onChange={handleDetailsChange}
      />
      <InputField
      label='Model'
      value={orderDetails.model}
      id='model'
      onChange={handleDetailsChange}
      />
      <InputField
      label='S/N'
      value={orderDetails.serialNumber}
      id='serialNumber'
      onChange={handleDetailsChange}
      />

      <InputLineItems
      lineItems={lineItems}
      setLineItems={setLineItems}
      />

      <div>
        <button
          onClick={() => {
            saveOrder(lineItems, orderDetails)
            setCurrentPage('index')
          }}
        >
          {orderDetails.status === 'new' ? 'Create Order' : 'Save Order'}
        </button>
      </div>
    </>
  )
}

export default EditOrder