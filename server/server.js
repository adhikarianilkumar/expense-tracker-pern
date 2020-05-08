const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: './config/config.env'});

// Port
const PORT = process.env.PORT || 5000;

const app = express();

// Import Routes
const transactions = require('./routes/transactionsRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(compression()); // Compression middleware
app.use(helmet()); // Secure HTTP headers in an Express app

// Morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Route Middleware
app.use('/api/v1/transactions', transactions);

// Production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});