import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
// 
function StockForm() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Stock Symbol" variant="outlined" size="small" />
      <TextField id="outlined-basic" label="Quantity" variant="outlined" size="small" type="number" />
      <TextField id="soutlined-basic" label="Purchase Price" variant="outlined" size="small" type="number" />
      <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
        Add Stock
      </Button>
    </Box>
  );
}

export default StockForm