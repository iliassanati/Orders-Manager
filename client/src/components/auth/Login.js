import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { loginCustomer, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [customer, setCustomer] = useState({
    email: '',
    password: '',
  });

  const { email, password } = customer;

  const onChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginCustomer({
        email,
        password,
      });
    }
  };

  return (
    <div className='row' style={{ marginRight: '250px', marginLeft: '200px' }}>
      <form onSubmit={onSubmit}>
        <h5 style={{ textAlign: 'center' }}>Login</h5>
        <br />

        <div className='card-panel light'>
          <div className='row'>
            <div className='input-field'>
              <input
                type='text'
                className='validate'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className='input-field'>
              <input
                type='password'
                className='validate'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
                required
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
