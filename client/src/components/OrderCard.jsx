function OrderCard ({order}) {
  const cardStyle = {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "20px 10px 20px 10px",
    margin: "20px 5px 20px 5px",
    width: "400px"
  }

  const flexBox = {
    display: "flex",
    marginBottom: "10px"
  }

  const itemStyle = {
    flex: 1
  }
  
  const lineItemStyle = {
    fontSize: "10px",
    color: "grey",
    marginTop: "5px"
  }

  return (
    <div style={cardStyle}>
      <div style={flexBox}>
        <div style={itemStyle}>DO {order.doNo}</div>
        <div>{order.status}</div>
      </div>
      <div style={itemStyle}><b>{order.companyName}</b></div>
      <div>{order.deliverTo}</div>
      <div>{order.contact}</div>
      <div style={lineItemStyle}>
        {order.items.map((item, index) =>
          <div key={item.id}>{index + 1}. {item.content} ({item.qty} pcs)</div>
        )}
      </div>
    </div>
  )
}

export default OrderCard