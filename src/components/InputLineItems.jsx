function InputLineItems({lineItems, onChange, onDelete, onAdd}) {
  return (
    <>
      <div>
        {lineItems.map(lineItem => {
          return (
            <div key={lineItem.id}>
              <input value={lineItem.content} id={'con-'+lineItem.id} onChange={onChange} className='lineItem'></input>
              <input value={lineItem.qty} id={'qty-'+lineItem.id} onChange={onChange} className='lineItemSmall'></input>
              <input value={lineItem.price} id={'prc-'+lineItem.id} onChange={onChange} type='number' className='lineItemSmall'></input>
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