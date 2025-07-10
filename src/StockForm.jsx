import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import StockContext from './StockContext'

function StockForm() {
  
  const { addStock } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    setShowAlert(false);
    
    // Check if any field is empty
    if (!symbol) {
      setError('Please enter a stock symbol');
      setShowAlert(true);
      return;
    }
    // Check if any field is empty and is negative number
    if (!quantity || parseFloat(quantity) <= 0) {
      setError('Please enter valid quantity (greater than 0)');
      setShowAlert(true);
      return;
    }
     // Check if any field is empty and is negative number
    if (!purchasePrice || parseFloat(purchasePrice) <= 0) {
      setError('Please enter valid purchase price (greater than 0)');
      setShowAlert(true);
      return;
    }
    
    addStock({
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice),
    });
    
    // Reset form after submission
    setSymbol('');
    setQuantity('');
    setPurchasePrice('');
    setShowAlert(false);
  };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    > 
      {showAlert && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      <TextField 
        label="Stock Symbol" id="outlined-basic" variant="outlined" size="small" 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value)} />
      <TextField 
        label="Quantity" id="outlined-basic" variant="outlined" size="small" type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} />
      <TextField 
        label="Purchase Price" id="soutlined-basic" variant="outlined" size="small" type="number" 
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}/>
      <Button 
        type="submit" variant="contained" startIcon={<AddShoppingCartIcon />}>
        Add Stock
      </Button>
    </Box>
  );
};

export default StockForm