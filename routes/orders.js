const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//@route GET api/orders
//@desc Get all customer orders
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.customer.id });
    res.json(orders);
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server Error');
  }
});

//@route POST api/orders
//@desc Add a new order
//@access Private
router.post(
  '/',
  [
    auth,
    check('name', 'Please Add a name').not().isEmpty(),
    check(
      'description',
      'Description must not have more than 50 caracters'
    ).isLength({ max: 50 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, quantity } = req.body;
    try {
      const newOrder = new Order({
        name,
        description,
        quantity,
        customer: req.customer.id,
      });
      const order = await newOrder.save();
      res.json(order);
    } catch (err) {
      console.log(err);
      res.send('Server Error');
    }
  }
);

//@route PUT /api/orders/:id
//@desc Update an order
//@access Private
router.put('/:id', auth, async (req, res) => {
  const { name, description, quantity } = req.body;

  const orderFields = {};
  if (name) orderFields.name = name;
  if (description) orderFields.description = description;
  if (quantity) orderFields.quantity = quantity;

  try {
    let order = await Order.findById(req.params.id);

    if (!order)
      return res
        .status(400)
        .json({ msg: `No order exists with this id ${req.params.id}` });

    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: orderFields },
      { new: true }
    );

    res.json({ order, msg: 'The order was updated' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server error');
  }
});

//@route DELETE /api/orders/:id
//@desc Delete an order
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order)
      return res
        .status(404)
        .json({ mg: `No order was found with this id ${req.params.id}` });

    await Order.findByIdAndRemove(req.params.id);
    res.json({ msg: 'the order was deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
