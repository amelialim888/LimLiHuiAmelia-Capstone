import { useState } from 'react'
import { useEffect } from 'react'
import financeLogo from './assets/FinanceLogo.png'
import './App.css'
import StockForm from './StockForm'
import StockList from './StockList'
import {StockProvider} from './StockContext';

function App() {

useEffect(() => {
    console.log()
  });

  const [stock, setStock] = useState([]);

  return (
    <>
      <StockProvider>
      <div>
        <img src={financeLogo} className="logo react" alt="Finance logo" /> 
      </div>
      <h1>Finance Dashboard</h1>
      <StockForm />
      <h2>Stock List</h2>
      <StockList />
      </StockProvider>
    </>
  )
}

export default App
