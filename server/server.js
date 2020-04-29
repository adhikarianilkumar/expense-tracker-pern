const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});

const PORT = process.env.PORT || 5000;

const app = express();

// Import Routes
const transactions = require('./routes/transactionsRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

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