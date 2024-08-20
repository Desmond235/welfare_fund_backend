const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const indexRouter = require('./signup/router');
// const paymentRouter = require('./paystack/routes/routes');
const imageRouter = require('./profile/routes/router');
const formRouter = require("./form/routes/router");
const paymentRouter = require('./Payment/routes/payment_route')
const verifyPaymentRouter = require('./Payment/routes/verify_payment');
const membershipRouter = require('./form/routes/membership_router');
const updateMembersRouter = require('./form/routes/update_members_router');
const getMembersRouter = require('./admin/routes/get_members_router');
const getTransactionsRouter = require('./admin/routes/get_transactions_router');
const PORT = process.env.PORT || 3000;

app.get((req, res) => {
    res.send("server running")
});

// admin routers
app.use('/api/admin', getMembersRouter);
app.use('/api/admin', getTransactionsRouter);

app.get('*');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/v1', paymentRouter)
app.use('/api/v1', indexRouter);
app.use('/api/v1', membershipRouter)
// app.use('/api/v1', paymentRouter);
app.use('/api/v1', imageRouter);
app.use('/api/v1', verifyPaymentRouter)
app.use('/api/v1', formRouter);
app.use('/api/v1', updateMembersRouter)

app.use('/images', express.static(path.join(__dirname,'images')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
 
});

// middleware for error handling
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    res.status(422).json({
        status: err.statusCode,
        message: err.message
    });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
