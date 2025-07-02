import { useState } from 'react'
import { useEffect } from 'react'
import financeLogo from './assets/FinanceLogo.png'
import './App.css'
import StockForm from './StockForm'

function App() {

  useEffect(() => {
    console.log()
  });

  return (
    <>
      <div>
        <img src={financeLogo} className="logo react" alt="Finance logo" />
      </div>
      <h1>Finance Dashboard</h1>
      <StockForm />
      <h2>Stock List</h2>
    </>
  )
}

export default App
