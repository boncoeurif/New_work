const http = require('http');
const url = require('url');

const PORT = 2000;

const conversionRates = {
  usd: 1500,
  eur: 1700,
  cny: 2000,
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (req.method === 'GET' && pathname === '/convert') {
    const amountStr = query.amount;
    const currency = query.currency ? query.currency.toLowerCase() : null;

    // Validation
    if (!amountStr || !currency) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing amount or currency' }));
    }

    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid number for amount' }));
    }

    if (!conversionRates[currency]) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Unsupported currency' }));
    }

    // Conversion logic
    const convertedAmount = amount * conversionRates[currency];

    const response = {
      input: {
        amount: amount,
        currency: currency,
      },
      convertedAmount: convertedAmount,
      unit: 'RWF',
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  }

  // Handle 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`HTTP Server running on http://localhost:${PORT}`);
});
