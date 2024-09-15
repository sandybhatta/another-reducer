import React, { useReducer, useState } from 'react';

const initialState = {
  transactions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    default:
      return state;
  }
}

const BudgetTracker = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');

  const addTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      type,
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    setAmount('');
    setDescription('');
  };

  const income = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <h2>Budget Tracker</h2>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <h3>Income: ${income}</h3>
      <h3>Expense: ${expense}</h3>
      <h3>Total: ${income - expense}</h3>
      <ul>
        {state.transactions.map(t => (
          <li key={t.id}>
            {t.description} - ${t.amount} ({t.type})
            <button onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: t.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;