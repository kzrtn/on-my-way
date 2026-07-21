import { useLineItems } from "../utils/useLineItems"

function InputLineItems({lineItems, setLineItems}) {
  const { onAdd, onChange, onDelete } = useLineItems(lineItems, setLineItems)

  return (
    <>
      <div>
        {lineItems.map(lineItem => {
          return (
            <div key={lineItem.id}>
              <input value={lineItem.content} data-id={lineItem.id} data-field='content' onChange={onChange} className='lineItem'></input>
              <input value={lineItem.qty} data-id={lineItem.id} data-field='qty' onChange={onChange} className='lineItemSmall'></input>
              <input value={lineItem.price} data-id={lineItem.id} data-field='price' onChange={onChange} type='number' className='lineItemSmall'></input>
              <button onClick={onDelete} id={lineItem.id}>Delete</button>
            </div>
          )
        })}
      </div>
      <button onClick={onAdd}>Add line item</button>
    </>
  )
}

export default InputLineItems