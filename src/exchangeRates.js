import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const CurrencyConverter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const baseURL = "http://localhost:3000/";
  const options = ['USD', 'INR', 'EUR'];

  const handleConversion = (sourceCurrency, targetCurrency, amount) => {
    setLoading(true);
    axios.get(baseURL + "app/mockApi/exchangeRates.json?")
      .then(response => {
        const data = response.data;
        const result = (amount / data[sourceCurrency]) * data[targetCurrency];
        setResult(result.toFixed(2) + ' ' + targetCurrency);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const handleSourceCurrency = (e) => {
    setSourceCurrency(e.target.value);
  };

  const handleTargetCurrency = (e) => {
    setTargetCurrency(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Grid xs={12} sm={12} lg={8} container className='container' spacing={4}>
      <Grid item xs={12} sm={6}>
        <InputLabel className='label'>Source Currency:</InputLabel>
        <Select className='select' value={sourceCurrency} onChange={handleSourceCurrency}>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel className='label'>Target Currency:</InputLabel>
        <Select className='select' value={targetCurrency} onChange={handleTargetCurrency}>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    
      <Grid item xs={12} sm={6}>
        <InputLabel className='label'>Enter Amount:</InputLabel>
        <TextField type='number' className='number' variant="outlined" value={amount} onChange={handleAmount} />
      </Grid>

      <Grid item xs={12} sm={7}>
        <Button variant='contained' onClick={() => handleConversion(sourceCurrency, targetCurrency, amount)}>Convert</Button>
      </Grid>

      <Grid item xs={12} sm={7}>
        <p>
          Result: {loading && "Loading"} {!loading && !error && result}
        </p>
      </Grid>
    </Grid>
  );
};

export default CurrencyConverter;
