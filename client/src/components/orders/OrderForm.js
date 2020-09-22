import React, { useState, useContext, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';

const OrderForm = () => {
  const orderContext = useContext(OrderContext);
  const { addOrder, updateOrder, clearCurrent, current } = orderContext;

  useEffect(() => {
    if (current !== null) {
      setOrder(current);
    } else {
      setOrder({
        name: '',
        description: '',
        quantity: '',
      });
    }
    // eslint-disable-next-line
  }, [orderContext, current]);

  const [order, setOrder] = useState({
    name: '',
    description: '',
    quantity: '',
  });

  const { name, description, quantity } = order;

  const onChange = e => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current !== null) {
      updateOrder(order);
    } else {
      addOrder(order);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='row' style={{ marginRight: '30px' }}>
        <h5 style={{ textAlign: 'center' }}>
          {current ? 'Edit Order' : 'Add Order'}
        </h5>
        <br />

        <div className='card-panel light'>
          <div className='row'>
            <div className='input-field '>
              <input
                placeholder='Order Name'
                type='text'
                name='name'
                value={name}
                className='validate'
                onChange={onChange}
              />
            </div>
            <div className='input-field'>
              <input
                type='text'
                className='validate'
                placeholder='Description'
                name='description'
                value={description}
                onChange={onChange}
              />
            </div>
            <div className='input-field'>
              <input
                type='text'
                className='validate'
                placeholder='Quantity'
                name='quantity'
                value={quantity}
                onChange={onChange}
              />
            </div>
          </div>
          {current && (
            <div className='col 12' style={{ float: 'right' }}>
              {' '}
              <button
                className='btn waves-effect waves-dark blue-grey'
                onClick={clearAll}
                type='submit'
              >
                Clear
              </button>
            </div>
          )}
          <div className='col 12' style={{ float: 'right' }}>
            {' '}
            <button
              className='btn waves-effect waves-dark blue-grey'
              type='submit'
            >
              {current ? 'Update Order' : 'Add Order'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
