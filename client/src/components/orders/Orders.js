import React, { Fragment, useContext } from 'react';
import OrderItem from './OrderItem';
import OrderContext from '../../context/order/orderContext';

const Orders = () => {
  const orderContext = useContext(OrderContext);

  const { orders, filtered } = orderContext;

  if (orders.length === 0) {
    return <h4>Please Add an order</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(order => <OrderItem key={order.id} order={order} />)
        : orders.map(order => <OrderItem key={order.id} order={order} />)}
    </Fragment>
  );
};

export default Orders;
