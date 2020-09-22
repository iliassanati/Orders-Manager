import React, { Fragment, useContext, useEffect } from 'react';
import OrderItem from './OrderItem';
import OrderContext from '../../context/order/orderContext';
import Spinner from '../layout/Spinner';

const Orders = () => {
  const orderContext = useContext(OrderContext);

  const { orders, filtered, getOrders, loading } = orderContext;

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  if (orders !== null && orders.length === 0 && !loading) {
    return <h5>Please Add an order</h5>;
  }

  return (
    <Fragment>
      {orders !== null && !loading ? (
        filtered !== null ? (
          filtered.map(order => <OrderItem key={order._id} order={order} />)
        ) : (
          orders.map(order => <OrderItem key={order._id} order={order} />)
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Orders;
