const express = require('express');
const connectDB = require('./config/db');

const app = express();

//init middleware
app.use(express.json({ extended: true }));

//Connect DB
connectDB();

//Define routes
app.use('/api/orders', require('./routes/orders'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
