const express = require('express');
const getTransactionsRouter = express.Router();
const getTransactions = require('../transactions/controller/get_all_transactions');

getTransactionsRouter.get('/get-transactions', getTransactions.getTransactions);

module.exports = getTransactionsRouter;