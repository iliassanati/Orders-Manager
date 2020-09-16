const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(400).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.customer = decoded.customer;
    next();
  } catch (err) {
    res.status(401).json('Server Error');
  }
};
