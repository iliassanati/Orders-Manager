import React, { useReducer } from 'react';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';
import axios from 'axios';
import {
  GET_ORDERS,
  CLEAR_ORDERS,
  ADD_ORDER,
  DELETE_ORDER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ORDER,
  FILTER_ORDER,
  CLEAR_FILTER,
  ORDER_ERROR,
} from '../types';

const OrderState = props => {
  const initialState = {
    orders: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  //GET orders
  const getOrders = async () => {
    try {
      const res = await axios.get('/api/orders');

      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Add order
  const addOrder = async order => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/orders', order, config);

      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Delete order
  const deleteOrder = async id => {
    try {
      await axios.delete(`/api/orders/${id}`);

      dispatch({
        type: DELETE_ORDER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear Orders
  const clearOrders = () => {
    dispatch({ type: CLEAR_ORDERS });
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
  const updateOrder = async order => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/orders/${order._id}`, order, config);

      dispatch({
        type: UPDATE_ORDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.msg,
      });
    }
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
        error: state.error,
        getOrders,
        addOrder,
        deleteOrder,
        setCurrent,
        clearCurrent,
        updateOrder,
        filterOrders,
        clearFilter,
        clearOrders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
