import React, { useContext, useRef, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';

const OrderFilter = () => {
  const orderContact = useContext(OrderContext);
  const text = useRef('');
  const { filterOrders, clearFilter, filtered } = orderContact;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterOrders(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Orders ...'
        onChange={onChange}
      ></input>
    </form>
  );
};

export default OrderFilter;
