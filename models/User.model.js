const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    
    // Required Attributes
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },


});

module.exports = User = mongoose.model('User', UserSchema);