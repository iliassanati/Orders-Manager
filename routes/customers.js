const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route POST api/customers
//@desc register user
//@access public
router.post(
  '/',
  [
    check('name', 'Please Add your name').not().isEmpty(),
    check('email', 'Please Add a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more caracters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      let customer = await Customer.findOne({ email });

      if (customer) {
        return res.status(400).json({ msg: 'Customer already exists' });
      }

      customer = new Customer({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      customer.password = await bcrypt.hash(password, salt);

      await customer.save();

      const payload = {
        customer: {
          id: customer.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server error');
    }
  }
);

module.exports = router;
