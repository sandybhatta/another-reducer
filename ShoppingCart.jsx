import React, { useReducer } from 'react';

const initialState = {
  cart: [],
  discount: 0,
  flag:false
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload,
        flag:!state.flag
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  let finalTotal=0
 if(state.flag) 
 { finalTotal = total - (total * state.discount) / 100;}
 else{finalTotal=total}

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${finalTotal}</h3>
        <button onClick={() => dispatch(
            { type: 'ADD_ITEM', 
            payload: { 
                id: Date.now(), 
                name: 'Item A', 
                price: parseInt(Math.random()*1000)
            }
            })}>
            Add Item A
      </button>
      <button onClick={() => dispatch({ type: 'APPLY_DISCOUNT', payload: 10 })}>
        Apply 10% Discount
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear Cart
      </button>
    </div>
  );
};

export default ShoppingCart;