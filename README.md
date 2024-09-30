# ethereum-lite-explorer-crawling

## Description

This project is an open-source block explorer on EVM chain. If you follow this repository, you can run explorer in localhost. This repository provides crawling code and database set up. This logic accesses the chain RPC URL every 2.5 seconds, receives data and stores it in the database.

## Getting Started

### Setting up Database

**This is done in MySQL Workbench. Proceed with the workbench settings first.**
<br>
Create a database by executing the query statement below before running the crawling server.

```sql
CREATE DATABASE explorer_db;

USE explorer_db;

CREATE TABLE block_data(
  blocknumber INT NOT NULL,
  time_stamp VARCHAR(256) NOT NULL,
  blockhash VARCHAR(256) NOT NULL,
  transaction_length VARCHAR(256) NOT NULL,
  primary key (blocknumber),
  constraint uq_multicolumn unique (blocknumber, time_stamp)
);

CREATE TABLE transaction_data(
  blockNumber INT NOT NULL,
  blockNumberHex VARCHAR(256) NOT NULL,
  txHash VARCHAR(256) NOT NULL,
  time_stamp VARCHAR(256) NOT NULL,
  fromAddress VARCHAR(256) NOT NULL,
  toAddress VARCHAR(256) NOT NULL,
  value VARCHAR(256) NOT NULL,
  constraint uq_txHash unique (txHash)
);

CREATE TABLE contract_data(
  blocknumber INT NOT NULL,
  contractAddress VARCHAR(256) NOT NULL,
  primary key (blocknumber),
  constraint uq_multicolumn unique (blocknumber, contractAddress)
);
```

### Installing

- Git clone this repo

```bash
git clone https://github.com/Generation-Foundation/ethereum-lite-explorer-crawling.git
```

- Create `.env` to update MySQL database settings.

```env
DB_HOST="host"
DB_USER="user"
DB_PASSWORD="password"
DB_DATABASE="explorer_db"
```

- Modify 'baseURL' in `etherApi.js` to your blockchain RPC URL

```javascript
const axios = require('axios');

const etherApi = axios.create({
  // change your blockchain RPC URL
  baseURL: 'https://eth.public-rpc.com',
  headers: { 'content-type': 'application/json' },
});

module.exports = { etherApi };
```

- Run it local with the following command

```bash
npm install --save
node server.js
```
