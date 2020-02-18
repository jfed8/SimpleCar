const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Additional Config Setup
require('dotenv').config({ debug: process.env.DEBUG });

// PORT Settings
const PORT = process.env.PORT || 5000;


// Database Connection Setup
connectDB();

// Middleware initialization
app.use(express.json({ extended: false }));


// Necessary API Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cars', require('./routes/api/cars'));


// PRODUCTION <-- Careful Here!
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));