import React, { useState, useContext } from 'react';
import { GlobalContext } from '../contex/GlobalState';

export const Addtransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState();
    
    const { addTransaction, transactions } = useContext(GlobalContext);
    
    const onSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: transactions.length+1,
            text,
            amount: +amount
        }
        addTransaction(newTransaction);
        setText("");
        setAmount("")
    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />(negative - expense, positive - income)
                    </label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
