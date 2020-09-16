import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
