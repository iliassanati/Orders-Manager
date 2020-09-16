import {
  ADD_ORDER,
  DELETE_ORDER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ORDER,
  FILTER_ORDER,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
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
          order.id === action.payload.id ? action.payload : order
        ),
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

    default:
      return state;
  }
};
