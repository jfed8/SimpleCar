const mongoose = require('mongoose');

// var PackageSchema = new Schema({ name: 'string' });
// var OptionSchema = new Schema({ name: 'string' });

const CarSchema = new mongoose.Schema({

    // Car Attributes
    make: String,
    model: String,
    year: String,
    trim: String,
    body_type: String,
    category: String,
    transmission: String,
    drivetrain: String,
    doors: { type: Number, required: true },
    engine: String,
    engine_size: Number,
    fuel: String,
    bhp: Number,
    vin: { type: String, unique: true },
    exterior_color: String,
    interior_color: String,
    interior_type: String,
    mileage: Number,

    // Optional Attributes
    bed_length: { type: String, required: false },
    mpg_city: { type: Number, required: false },
    mpg_highway: { type: Number, required: false },
    empg: { type: Number, required: false },
    vehicleID: { type: String, required: false },
    packages: [String],
    options: [String]

});

const ListingSchema = new mongoose.Schema({
    car: CarSchema,
    
    // Listing Attributes
    user: String,
    views: Number,
    price: mongoose.Types.Decimal128,
    description: String
})

ListingSchema.index({'$**': 'text'});


module.exports = Listing = mongoose.model('Listing', ListingSchema);