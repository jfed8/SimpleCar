const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    
    // Required Attributes
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    display_name: { type: String, required: false },
    password: { type: String, required: true },


});

module.exports = User = mongoose.model('User', UserSchema);