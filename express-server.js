const express = require('express');
const { validateConversion } = require('./validation');

const app = express();
const PORT = 3000;

app.get('/convert', validateConversion, (req, res) => {
  const { amount, currency, rate } = req.validatedData;

  const convertedAmount = amount * rate;

  res.json({
    input: {
      amount: amount,
      currency: currency,
    },
    convertedAmount: convertedAmount,
    unit: 'RWF',
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Express Server running on http://localhost:${PORT}`);
});
