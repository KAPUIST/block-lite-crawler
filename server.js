const express = require('express');
const app = express();

const { rpcCheckBlockNum } = require('./rpcCheckBlockNum');
const { rpcRecheckBlockNum } = require('./rpcRecheckBlockNum');

require('dotenv').config();
const port = process.env.PORT || 3006;
// forever
setInterval(() => rpcCheckBlockNum(), 2000); // Checking latest block data every 2 seconds
setInterval(() => rpcRecheckBlockNum(), 60000); // Checking 30 previous block data every minute

app.get('/', (req, res) => {
  res.json('crawling server');
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
