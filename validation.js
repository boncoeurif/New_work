const conversionRates = {
  usd: 1500,
  eur: 1700,
  cny: 2000,
};

const validateConversion = (req, res, next) => {
  const { amount, currency } = req.query;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Missing amount or currency' });
  }

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return res.status(400).json({ error: 'Invalid number for amount' });
  }

  const lowerCurrency = currency.toLowerCase();
  if (!conversionRates[lowerCurrency]) {
    return res.status(400).json({ error: 'Unsupported currency' });
  }

  // Attach processed values to request object for use in route
  req.validatedData = {
    amount: numericAmount,
    currency: lowerCurrency,
    rate: conversionRates[lowerCurrency]
  };

  next();
};

module.exports = {
  validateConversion,
  conversionRates
};
