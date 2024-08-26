const express = require('express');
const getTransactionsRouter = express.Router();
const getTransactions = require('../transactions/controller/get_all_transactions');
const search = require('../transactions/controller/search_transaction');
const totalAmount = require('../transactions/controller/total_amount');

getTransactionsRouter.get('/get-transactions', getTransactions.getTransactions);
getTransactionsRouter.get('/search-transactions', search.searchTransaction);
getTransactionsRouter.get('/total-amount', totalAmount)

module.exports = getTransactionsRouter;