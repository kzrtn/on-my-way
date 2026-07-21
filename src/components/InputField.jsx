function InputField({value, id, label, type, onChange}) {
  return (
    <div>
      {label}: <input value={value} id={id} onChange={onChange} type={type} className='lineItem'></input>
    </div>
  )
}

export default InputField