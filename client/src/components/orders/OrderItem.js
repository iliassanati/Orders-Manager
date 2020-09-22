import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/orderContext';

const OrderItem = ({ order }) => {
  const orderContext = useContext(OrderContext);

  const { deleteOrder, setCurrent, clearCurrent } = orderContext;
  const { _id, name, description, quantity } = order;

  const onDelete = () => {
    deleteOrder(_id);
    clearCurrent();
  };

  return (
    <div className='row'>
      <div className='card blue-grey darken-1'>
        <div className='card-content white-text'>
          <h6>
            <i className='fas fa-tag' />
            <strong> Order Name :</strong> {name}
          </h6>
          <h6>
            <i className='fas fa-info-circle' /> <strong>Description:</strong>{' '}
            {description}
          </h6>
          <h6>
            <i className='fas fa-sort-numeric-up' /> <strong>Quantity:</strong>{' '}
            {quantity}
          </h6>
          <div style={{ float: 'right' }}>
            <button
              className='waves-effect waves-light btn-small black'
              onClick={() => setCurrent(order)}
            >
              Edit
            </button>
            <button
              className='waves-effect waves-light btn-small red'
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
