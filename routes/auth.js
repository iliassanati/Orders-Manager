const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route GET /api/auth
//@des Get logged in customer
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select(
      '-password'
    );

    res.json(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@route POST /api/auth
//@des auth customer and get token
//@access Public
router.post(
  '/',
  [
    check('email', 'Please Add a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let customer = await Customer.findOne({ email });

      if (!customer) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, customer.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        customer: {
          id: customer.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
