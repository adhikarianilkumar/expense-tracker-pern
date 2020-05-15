const router = require('express').Router();

const { getTransactions, addTransactions, deleteTransactions } = require('../controllers/transactionsCtrl')

router
    .route('/')
    .get(getTransactions)
    .post(addTransactions);

router
    .route('/:id')
    .delete(deleteTransactions);

module.exports = router;