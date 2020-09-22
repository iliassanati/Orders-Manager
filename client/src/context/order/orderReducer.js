import {
  ADD_ORDER,
  DELETE_ORDER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ORDER,
  FILTER_ORDER,
  CLEAR_FILTER,
  ORDER_ERROR,
  GET_ORDERS,
  CLEAR_ORDERS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        loading: false,
      };

    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload),
        loading: false,
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
      };

    case FILTER_ORDER:
      return {
        ...state,
        filtered: state.orders.filter(order => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return order.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
