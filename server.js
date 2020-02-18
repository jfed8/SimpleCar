const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Additional Config Setup
require('dotenv').config({ debug: process.env.DEBUG });

// PORT Settings
const PORT = process.env.PORT || 8000;


// Database Connection Setup
connectDB();

// Middleware initialization
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send('API Running'));

// Users API
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cars', require('./routes/api/cars'));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));