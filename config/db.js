const mongoose = require('mongoose');
const config = require('dotenv').config();
const db = process.env.MongoDB_URI;

const connectDB = async() => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Successfully connected to MongoDB");
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}


module.exports = connectDB;