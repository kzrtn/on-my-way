import dayjs from "dayjs"

export default function handleOrder (setOrderDetails, setLineItems, listOfOrders, setListOfOrders) {
  const newDONo = listOfOrders => {
    const lastDO = listOfOrders.reduce((max, order) => max > Number(order.doNo) ? max : Number(order.doNo), 0)
    return (lastDO+1).toString().padStart(4, '0')
  }

  const loadNewOrder = () => {
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
    setLineItems([
      {
        id: crypto.randomUUID(),
        content: 'line item 0',
        qty: 1,
        price: '',
      },
    ])
  }

  const loadOrder = id => {
    const clickedOrder = listOfOrders.find(order => order.doNo === id)
    setOrderDetails(clickedOrder)
    setLineItems(clickedOrder.items)
  }

  const saveOrder = (lineItems, orderDetails) => {
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
      //setCurrentPage('index')
      //createNewOrder()
    } else {
    const newOrder = {
      ...orderDetails,
      items: lineItems
    }
    setListOfOrders(listOfOrders.map(order => order.doNo === newOrder.doNo ? newOrder : order))
    //setCurrentPage('index')
    //clearCanvas()
  }}

  const markOrderAsFulfilled = (orderDetails, lineItems, sigCanvas) => {
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
    //clearCanvas()
  }

  return { loadNewOrder, loadOrder, saveOrder, markOrderAsFulfilled }
}