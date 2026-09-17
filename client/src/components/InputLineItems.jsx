function InputLineItems({order, setOrder}) {
  const onChange = ({ target }) => {
    const {id, field} = target.dataset

    setOrder({
      ...order,
      items: order.items.map(item => item.id === id ? { ...item, [field]: target.value } : item)
    })
  }

  const addItem = () => {
    setOrder({
      ...order,
      items: order.items.concat({
        id: crypto.randomUUID(),
        content: '',
        qty: '',
        price: ''
      })
    })
  }

  const onDelete = id => {
    setOrder(order.items.filter(item => item.id !== id))
  }

  return (
    <>
      <div>
        {order.items.map(item => {
          return (
            <div key={item.id}>
              <input value={item.content} data-id={item.id} data-field='content' onChange={onChange} className='lineItem'></input>
              <input value={item.qty} data-id={item.id} data-field='qty' onChange={onChange} className='lineItemSmall'></input>
              <input value={item.price} data-id={item.id} data-field='price' type='number' onChange={onChange} className='lineItemSmall'></input>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          )
        })}
      </div>
      <button onClick={addItem}>Add line item</button>
    </>
  )
}

export default InputLineItems