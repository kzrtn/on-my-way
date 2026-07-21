import OrderCard from "../components/OrderCard"

function Index({listOfOrders, createNewOrder, loadOrder}) {
  const reversedList = listOfOrders.toReversed()
  return (
    <div>
      <h2>DOs</h2>
      <button onClick={createNewOrder}>New DO</button>
      {reversedList.map(order =>
        <div key={order.doNo} id={order.doNo} onClick={loadOrder} className='order-list-item' style={{width: "400px"}} >
          <OrderCard order={order} />
        </div>
      )}
    </div>
  )
}

export default Index