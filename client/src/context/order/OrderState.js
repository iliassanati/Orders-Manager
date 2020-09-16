import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';
import {
  ADD_ORDER,
  DELETE_ORDER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ORDER,
  FILTER_ORDER,
  CLEAR_FILTER,
} from '../types';

const OrderState = props => {
  const initialState = {
    orders: [
      {
        id: 1,
        name: 'pcGamer',
        description: 'Lenovo yoga i7 super',
        quantity: '5',
      },
      {
        id: 2,
        name: 'telephone',
        description: 'Samsung galaxy s20 blanc',
        quantity: '3',
      },
      {
        id: 3,
        name: 'tab',
        description: 'Ipad 4 32gb 4go ram',
        quantity: '8',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  //Add order
  const addOrder = order => {
    order.id = uuid();
    dispatch({ type: ADD_ORDER, payload: order });
  };

  //Delete order
  const deleteOrder = id => {
    dispatch({ type: DELETE_ORDER, payload: id });
  };

  //Set Current order
  const setCurrent = order => {
    dispatch({ type: SET_CURRENT, payload: order });
  };

  //Clear current order
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update order
  const updateOrder = order => {
    dispatch({ type: UPDATE_ORDER, payload: order });
  };
  //Filter orders
  const filterOrders = text => {
    dispatch({ type: FILTER_ORDER, payload: text });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        current: state.current,
        filtered: state.filtered,
        addOrder,
        deleteOrder,
        setCurrent,
        clearCurrent,
        updateOrder,
        filterOrders,
        clearFilter,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
