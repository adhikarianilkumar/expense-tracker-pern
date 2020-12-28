import React, { useContext } from 'react';
import { GlobalContext } from '../contex/GlobalState';
import { numberWithCommas } from '../utils/format';
import classes from './Balance.module.css';

export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += parseInt(item)), 0).toFixed(2);

    return (
        <>
            <h4 className={classes.green}>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </>
    )
}
