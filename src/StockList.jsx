//displays a list of all the stocks entered by the user.
// Implement conditional rendering in the stock list component to display a message when 
// no stocks are available and to show the current price and profit/loss only when the data is available.
import { useEffect, useState, useContext } from 'react';
import StockContext from './StockContext';
import './StockList.css'

function StockList() {
  const { stocks } = useContext(StockContext);
  const [currentPrices, setCurrentPrices] = useState({});
  const [error, setError] = useState('');

  const fetchPrice = async (symbol) => {
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`
      );
      const data = await res.json();
      const globalQuote = data['Global Quote'];
      
      if (!globalQuote) {
        setError('Invalid Stock Symbol');
        return
      }

      const price = parseFloat(data['Global Quote']['05. price']);
      return isNaN(price) ? null : price;
    } catch (error) {
      console.error('Error fetching price');
      return;
    }
  };

  useEffect(() => {
    const fetchAllPrices = async () => {
      const prices = {};
            
      for (const stock of stocks) {
        if (!currentPrices[stock.symbol]) {
          const price = await fetchPrice(stock.symbol);
          if (price !== null) {
            prices[stock.symbol] = price;
          } 
          else {
            // Show error for invalid symbols
            setError(`Invalid stock symbol: ${stock.symbol}`);
          }
        }
      }
      setCurrentPrices((prev) => ({ ...prev, ...prices }));
    };

    if (stocks.length > 0) {
      fetchAllPrices();
    }
  }, [stocks]);

  // Conditional rendering for when no stocks are available
  if (stocks.length === 0) {
    return <p>No stocks added yet.</p>
  }

  return (
    <>
      {!error && stocks.map((stock) => {
        const current = currentPrices[stock.symbol];
        const profitLoss = current != null ? ((current - stock.purchasePrice) * stock.quantity).toFixed(2)
            : null;
        return (
          <div key={stock.symbol}>
            <p><strong>Symbol:</strong> {stock.symbol}</p>
            <p>Quantity: {stock.quantity}</p>
            <p>Purchase Price: ${stock.purchasePrice}</p>
            <p>Current Price: ${current}</p>
            <p className={`profit-loss ${profitLoss > 0 ? 'gain' : 'loss'}`}>
              Profit/Loss: ${profitLoss}
            </p>
          </div>
        );
      })}
      {error}
    </>
  )
}
export default StockList;
