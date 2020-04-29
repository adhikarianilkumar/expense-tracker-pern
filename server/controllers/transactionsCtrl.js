//const Transaction = require('../models/TransactionModel');
const pool = require("../config/db");

// @desc    Get all transactions
// @route   GET api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await pool.query("SELECT * FROM expense_details");

        return res.status(200).json({
            success: true,
            count: transactions.rows.length,
            data: transactions.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc    Add all transaction
// @route   POST api/v1/transaction
// @access  Public
exports.addTransactions = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        console.log('addTransactions')

        const transaction = await pool.query(
            "INSERT INTO expense_details (text, amount) VALUES ($1, $2) RETURNING *",
            [text, amount]
          );

        return res.status(201).json({
            success: true,
            data: transaction.rows[0]
        });
    } catch (err) {
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc    Delete all transaction
// @route   DELETE api/v1/transaction:id
// @access  Public
exports.deleteTransactions = async (req, res, next) => {

    try {
        //const transaction = await Transaction.findById(req.params.id);
        console.log(req.params.id)
        const transaction = await pool.query("DELETE FROM expense_details WHERE id = $1", [
            req.params.id
          ]);

        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'Transaction not found.'
            });
        }

        //await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }



    
}