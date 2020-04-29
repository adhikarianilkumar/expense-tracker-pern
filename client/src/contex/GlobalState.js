import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
  }

  // Create context
  export const GlobalContext = createContext(initialState);

  // Provider component  
  export const GlobalProvider = ({ children }) => {
      const [state, dispath] = useReducer(AppReducer, initialState)

      // Actions

      async function getTransactions(){
          try {
            const res = await axios.get('http://localhost:5000/api/v1/transactions');
            dispath({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
          } catch (err) {
            dispath({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
          }
      }


      async function deleteTransaction(id){
          try {
            await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
            dispath({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
          } catch (err) {
            dispath({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
          }
      }

      async function addTransaction(transaction){
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }

          try {
              const res = await axios.post('http://localhost:5000/api/v1/transactions', transaction, config);
              dispath({
                  type: 'ADD_TRANSACTION',
                  payload: res.data.data
              });
          } catch (err) {
            dispath({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
          }        
    }

      return (
          <GlobalContext.Provider value={{
              transactions: state.transactions,
              error: state.error,
              loading: state.loading,
              getTransactions,
              deleteTransaction,
              addTransaction
          }}>
              {children}
          </GlobalContext.Provider>
      );
  }
  