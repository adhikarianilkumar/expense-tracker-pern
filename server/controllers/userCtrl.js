const pool = require("../config/db");

// @desc    User registration
// @route   POST api/v1/user/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        console.log(req.body);

        const transaction = await pool.query("SELECT id, text, amount FROM expense_details");

        return res.status(201).json({
            success: true,
            data: transaction.rows
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            pool.end();
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}

// @desc    User login
// @route   POST api/v1/user/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        console.log(req.body);

        const transaction = await pool.query("SELECT id, text, amount FROM expense_details");

        return res.status(201).json({
            success: true,
            data: transaction.rows
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            pool.end();
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}


// @desc    Forgot Password
// @route   POST api/v1/user/forgotPassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
    try {
        console.log(req.body);

        const transaction = await pool.query("SELECT id, text, amount FROM expense_details");

        return res.status(201).json({
            success: true,
            data: transaction.rows
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            pool.end();
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}