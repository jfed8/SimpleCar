const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Listing = require('../../models/Listing.model');


// @route         POST api/listings/create
// @description   Create New Listing
// @access        public
router.route('/create').post((req, res) => {
    const user = req.body.car.user;
    const make = req.body.car.make;
    const model = req.body.car.model;
    const year = req.body.car.year;
    const trim = req.body.car.trim;
    const category = req.body.car.category;
    const body_type = req.body.car.body_type;
    const transmission = req.body.car.transmission;
    const drivetrain = req.body.car.drivetrain;
    const doors = req.body.car.doors;
    const engine = req.body.car.engine;
    const engine_size = req.body.car.engine_size;
    const bhp = req.body.car.bhp;
    const fuel = req.body.car.fuel;
    const vin = req.body.car.vin;
    const exterior_color = req.body.car.exterior_color;
    const interior_color = req.body.car.interior_color;
    const interior_type = req.body.car.interior_type;
    const bed_length = req.body.car.bed_length;
    const mpg_city = req.body.car.mpg_city;
    const mpg_highway = req.body.car.mpg_highway;
    const mpg_overall = req.body.car.mpg_overall;
    const empg = req.body.car.empg;
    const vehicleID = req.body.car.vehicleID;
    const packages = req.body.car.packages;
    const options = req.body.car.options;
    const mileage = req.body.car.mileage;

    const price = req.body.price;
    const description = req.body.description;


    const newListing = new Listing({
        description,
        price,
        car: {
            user,
            make,
            model,
            year,
            trim,
            category,
            body_type,
            transmission,
            drivetrain,
            doors,
            engine,
            engine_size,
            fuel,
            bhp,
            vin,
            exterior_color,
            interior_color,
            interior_type,
            bed_length,
            mpg_city,
            mpg_highway,
            mpg_overall,
            empg,
            vehicleID,
            packages,
            options,
            mileage
        }
        
    });

    newListing.save()
        .then(() => res.json('Car Created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});




// @route         GET api/listings/:VIN
// @description   Get Listing
// @access        public
router.route('/:vin').get( async (req, res) => {

    try {
        const listing = await (Listing.findOne({ "car.vin": req.params.vin }));
        res.json(listing);

    } catch (error) {
        console.log(error);
        res.status(401).send("No Listing Found.");
    }

});


module.exports = router;