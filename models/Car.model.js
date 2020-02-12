const mongoose = require('mongoose');

// var PackageSchema = new Schema({ name: 'string' });
// var OptionSchema = new Schema({ name: 'string' });

const CarSchema = new mongoose.Schema({

    // Required Attributes
    user: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    trim: { type: String, required: true },
    body_type: { type: String, required: true },
    transmission: { type: String, required: true },
    drivetrain: { type: String, required: true },
    doors: { type: Number, required: true },
    engine: { type: String, required: true },
    fuel: { type: String, required: true },
    vin: { type: String, required: true },
    exterior_color: { type: String, required: true },
    interior_color: { type: String, required: true },
    interior_type: { type: String, required: true },

    // Optional Attributes
    bed_length: { type: String, required: false },
    mpg_city: { type: Number, required: false },
    mpg_highway: { type: Number, required: false },
    mpg_overall: { type: Number, required: false },
    empg: { type: Number, required: false },
    vehicleID: { type: String, required: false },
    packages: [String],
    options: [String],

    // Listing Attributes
    views: Number,
    price: mongoose.Types.Decimal128,
    

});


module.exports = Car = mongoose.model('Car', CarSchema);