import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { registerCustomer, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      props.history.push('/');
    }

    if (error === 'Customer already exists') {
      setAlert(error, 'red');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = customer;

  const onChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'red');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'red');
    } else {
      registerCustomer({ name, email, password });
    }
  };

  return (
    <div className='row' style={{ marginRight: '250px', marginLeft: '200px' }}>
      <form onSubmit={onSubmit}>
        <h5 style={{ textAlign: 'center' }}>Register Account</h5>
        <br />

        <div className='card-panel light'>
          <div className='row'>
            <div className='input-field '>
              <input
                placeholder='Enter your Name'
                type='text'
                name='name'
                value={name}
                className='validate'
                required
                onChange={onChange}
              />
            </div>
            <div className='input-field'>
              <input
                type='text'
                className='validate'
                placeholder='Email'
                name='email'
                value={email}
                required
                onChange={onChange}
              />
            </div>
            <div className='input-field'>
              <input
                type='password'
                className='validate'
                placeholder='Password'
                name='password'
                value={password}
                required
                minLength='6'
                onChange={onChange}
              />
            </div>
            <div className='input-field'>
              <input
                type='password'
                className='validate'
                placeholder='Confirm your Password'
                name='password2'
                value={password2}
                required
                onChange={onChange}
              />
            </div>
          </div>
          <div className='col 12' style={{ float: 'right' }}>
            {' '}
            <button
              className='btn waves-effect waves-dark blue-grey'
              type='submit'
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
