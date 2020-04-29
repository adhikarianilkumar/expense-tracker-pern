import React, { useContext } from 'react';
import { GlobalContext } from '../contex/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = Math.sign(transaction.amount)>0?'+':'-';
    return (
        <li className={Math.sign(transaction.amount)>0?'plus':'minus'}>
            {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
            <button onClick={ ()=> deleteTransaction(transaction.id) } className="delete-btn">x</button>
        </li>
    )
}
