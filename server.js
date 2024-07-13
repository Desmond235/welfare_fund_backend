const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./signup/router');
const PORT = process.env.PORT || 3000;

app.get((req, res) => {
    res.send("server running")
});

app.use(express.json());
app.use('/api/', indexRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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