// Use the useState hook to manage the state of the stock list. 
// Create a StockContext to store the stock list and provide it to the necessary components 
// using the useContext hook.
import { createContext, useState, useCallback } from 'react';

const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]); // Stores array of stock objects

  const addStock = useCallback((stock) => {
    setStocks((prev) => [...prev, stock]);
  }, []);

  return (
    <StockContext.Provider value={{ stocks, addStock }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
export { StockProvider };

