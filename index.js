const express = require('express');
const { resolve } = require('path');
const stocks = require('./stock.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// Sort stocks by price
const sortStocksByPrice = (pricing) => (stock1, stock2) => {
  if (pricing === 'high-to-low') {
    return stock2.price - stock1.price; // High-to-low
  } else {
    return stock1.price - stock2.price; // Low-to-high
  }
};

// Sort stocks by growth
const sortStocksByGrowth = (growthParams) => (stock1, stock2) => {
  if (growthParams === 'high-to-low') {
    return stock2.growth - stock1.growth; // High-to-low
  } else {
    return stock1.growth - stock2.growth; // Low-to-high
  }
};

// sort stocks ascending order based on price
const sortStocksASC = (stock1, stock2) => {
  return stock1.price - stock2.price;
};

// Endpoint 1: Get the stocks sorted by pricing
app.get('/stocks/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;

  let stocks_copy = stocks.slice();
  let sortedStocks = stocks_copy.sort(sortStocksByPrice(pricing));

  res.json({ stocks: sortedStocks });
});

// Endpoint 2: Get the stocks sorted based on their Growth
app.get('/stocks/sort/growth', (req, res) => {
  let growthParams = req.query.growth;

  let stocks_copy = stocks.slice();
  let sortedStocks = stocks_copy.sort(sortStocksByGrowth(growthParams));

  res.json({ stocks: sortedStocks });
});

// Endpoint 3: Filter the stocks based on the 2 Stock Exchange (NSE. and BSE)
app.get('/stocks/filter/exchange', (req, res) => {
  let exchange = req.query.exchange;

  let filter_stocks = stocks.filter(
    (stock) => stock.exchange === exchange.toLowerCase()
  );

  // sort the filter_stocks in asc order based on price
  let stocksCopy = filter_stocks.slice();

  let sortedStocks = stocksCopy.sort(sortStocksASC);

  res.json({ stocks: sortedStocks });
});

// Endpoint 4: Filter the stocks based on the Industrial Sector.
app.get('/stocks/filter/industry', (req, res) => {
  let industry = req.query.industry;

  let filter_stocks = stocks.filter(
    (stock) => stock.industry === industry.toLowerCase()
  );

  // sort the filter_stocks in asc order based on price
  let stocksCopy = filter_stocks.slice();

  let sortedStocks = stocksCopy.sort(sortStocksASC);

  res.json({ stocks: sortedStocks });
});

// Endpoint 5: Send all available stocks
app.get('/stocks', (req, res) => {
  res.json({ stocks: stocks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
