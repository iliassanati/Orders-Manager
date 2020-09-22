import React, { useContext, useEffect } from 'react';
import Orders from '../orders/Orders';
import OrderForm from '../orders/OrderForm';
import OrderFilter from '../orders/OrderFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadCustomer();

    // eslint-disable-next-line
  }, []);

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
