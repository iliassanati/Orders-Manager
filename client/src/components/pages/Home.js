import React from 'react';
import Orders from '../orders/Orders';
import OrderForm from '../orders/OrderForm';
import OrderFilter from '../orders/OrderFilter';

const Home = () => {
  return (
    <div className='row'>
      <div className='col s6'>
        <OrderForm />
      </div>
      <div className='col s6'>
        <OrderFilter />
        <Orders />
      </div>
    </div>
  );
};

export default Home;
