const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Car = require('../../models/Car.model');


  
router.route('/create').post((req, res) => {
    const user = req.body.user;
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const trim = req.body.trim;
    const body_type = req.body.body_type;
    const transmission = req.body.transmission;
    const drivetrain = req.body.drivetrain;
    const doors = req.body.doors;
    const engine = req.body.engine;
    const fuel = req.body.fuel;
    const vin = req.body.vin;
    const exterior_color = req.body.exterior_color;
    const interior_color = req.body.interior_color;
    const interior_type = req.body.interior_type;
    const bed_length = req.body.bed_length;
    const mpg_city = req.body.mpg_city;
    const mpg_highway = req.body.mpg_highway;
    const mpg_overall = req.body.mpg_overall;
    const empg = req.body.empg;
    const vehicleID = req.body.vehicleID;
    const packages = req.body.packages;
    const options = req.body.options;


    const newCar = new Car({
        user,
        make,
        model,
        year,
        trim,
        body_type,
        transmission,
        drivetrain,
        doors,
        engine,
        fuel,
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
        options
    });

    newCar.save()
        .then(() => res.json('Car Created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
