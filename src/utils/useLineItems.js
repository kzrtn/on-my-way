export function useLineItems(lineItems, setLineItems) {
  const onChange = e => {
    const {id, field} = e.target.dataset
    setLineItems(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: e.target.value } : item)
    )
  }
  
  const onAdd = () => {
    setLineItems(lineItems.concat({
      id: crypto.randomUUID(),
      content: 'new line',
      qty: 1,
      price: ''
    }))
  }

  const onDelete = e => {
    setLineItems(lineItems.filter(lineItem => lineItem.id !== e.target.id))
  }

  return {lineItems, onChange, onAdd, onDelete}
}
