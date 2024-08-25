const express = require('express');
const getTransactionsRouter = express.Router();
const getTransactions = require('../transactions/controller/get_all_transactions');
const search = require('../transactions/controller/search_transaction');

getTransactionsRouter.get('/get-transactions', getTransactions.getTransactions);
getTransactionsRouter.get('/search-transactions', search.searchTransaction);

module.exports = getTransactionsRouter;