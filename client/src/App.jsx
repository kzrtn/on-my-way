import { Routes, Route, useMatch } from 'react-router-dom'

// Pages
import OrderList from './pages/OrderList.jsx'
import EditOrder from './pages/EditOrder.jsx'
import ViewOrder from './pages/ViewOrder.jsx'

function App() {
  const orderIdMatch = useMatch("/order/:id")
  const editIdMatch = useMatch("/order/edit/:id")

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <OrderList />
        }/>

        <Route path="order/edit/:id" element={
          <EditOrder orderId={editIdMatch?.params.id} />
        }/>

        <Route path="order/edit/" element={
          <EditOrder orderId="" />
        }/>

        <Route path="order/:id" element={
          <ViewOrder orderId={orderIdMatch?.params.id} />
        }/>
      </Routes>
    </div>
    
  )
}

export default App
