import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const { isAuthenticated, logout, customer, loadCustomer } = authContext;
  const { clearOrders } = orderContext;

  useEffect(() => {
    loadCustomer();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearOrders();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {customer && customer.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' /> <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='blue-grey' style={{ marginBottom: '50px' }}>
      <div
        className='nav-wrapper'
        style={{
          marginLeft: '50px',
          marginRight: '30px',
          marginBottom: '30px',
        }}
      >
        <Link to='/' className='brand-logo'>
          <i className='fas fa-shopping-cart'> Orders Keeper</i>
        </Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
