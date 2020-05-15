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

// Check for Env
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Initialize Express app
const app = express();

// Import Routes
const transactions = require('./routes/transactionsRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Cross-origin resource sharing(CORS) app to be accessed through our own domain in production Env
const origin = {
    origin: isProduction ? process.env.PRODUCTION_URI_FOR_YOUR_APP : '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(origin));
app.use(compression()); // Compression middleware
app.use(helmet()); // Secure HTTP headers in an Express app
// To limit repeated requests to endpoints
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests,
});
app.use(limiter); // Apply to every endpoint but can be customizable to specific route

// Morgan
if(isDevelopment){
    app.use(morgan('dev'));
}

// Route Middleware
app.use('/api/v1/transactions', transactions);

// Production
if(isProduction){
    app.use(express.static('./../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});