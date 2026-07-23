import { useState } from 'react'

// Pages
import Index from './pages/Index.jsx'
import EditOrder from './pages/EditOrder.jsx'
import ViewOrder from './pages/ViewOrder.jsx'

// Utils
import handleOrder from './utils/handleOrder.js'

// Data
import { initialListOfOrders } from './backend/initialListOfOrders.js'

function App() {
  const [currentPage, setCurrentPage] = useState('index')
  const [ listOfOrders, setListOfOrders ] = useState(initialListOfOrders)
  const [ orderDetails, setOrderDetails ] = useState({})
  const [ lineItems, setLineItems ] = useState([])

  const { loadNewOrder, loadOrder, saveOrder, markOrderAsFulfilled } = handleOrder(setOrderDetails, setLineItems,
                                                                                      listOfOrders, setListOfOrders)

  return (
    <>
      {
        currentPage === 'index'
        ? <Index
            listOfOrders={listOfOrders}
            createNewOrder={() => {
                loadNewOrder(setOrderDetails, setLineItems, listOfOrders)
                setCurrentPage('EditOrder')
              }
            }
            loadOrder={e => {
              loadOrder(e.currentTarget.id)
              setCurrentPage('ViewOrder')
            }}
          />
        : null
      }

      {
        currentPage === 'EditOrder'
        ? <EditOrder
          saveOrder={saveOrder}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
          lineItems={lineItems}
          setLineItems={setLineItems}
          listOfOrders={listOfOrders}
          setListOfOrders={setListOfOrders}
          setCurrentPage={setCurrentPage}
        />
        : null
      }

      {
        currentPage === 'ViewOrder'
        ? <ViewOrder
          markOrderAsFulfilled={markOrderAsFulfilled}
          orderDetails={orderDetails}
          lineItems={lineItems}
          setCurrentPage={setCurrentPage}
        />
        : null
      }
    </>
    
  )
}

export default App
