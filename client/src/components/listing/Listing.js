import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect, withRouter, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';

const Listing = () => {

    const _isMounted= useRef(true); // Initial value _isMounted = true

    useEffect(() => {
        return () => { // ComponentWillUnmount
            _isMounted.current = false;
        }
    }, []);

    const { vin } = useParams();

    const [listingObject, setListingObject] = useState({
        // Set Default Listing Values
        user: '',
        photos: [],
        price: 0,
        views: 0,
        description: ''
    });

    const [carObject, setCarObject] = useState({
        vin: '',
        make: '',
        model: '',
        year: '',
        trim: '',
        body_type: '',
        category: '',
        transmission: '',
        drivetrain: '',
        doors: 0,
        engine: '',
        engine_size: 0,
        bhp: 0,
        mpg_city: 0,
        mpg_highway: 0,
        fuel_type: '',
        vehicle_id: '',
        exterior_color: '',
        interior_color: '',
        interior_material: '',
        bed_length: '',
        packages: [],
        options: [],
        mileage: 0,
        more_info_link: '',
        overall_grade: 'N/A'
    });

    // console.log("VIN FROM PARAMS -- " + vin);

    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        Axios.get('/api/listings/' + vin, config)
        .then(function (response) {
            if (_isMounted.current) {
                console.log(response.data);

                carObject.vin = response.data.car.vin;
                carObject.make = response.data.car.make;
                carObject.model = response.data.car.model;
                carObject.year = response.data.car.year;
                carObject.trim = response.data.car.trim;
                carObject.body_type = response.data.car.body_type;
                carObject.category = response.data.car.category;
                carObject.transmission = response.data.car.transmission;
                carObject.drivetrain = response.data.car.drivetrain;
                carObject.doors = response.data.car.doors;
                carObject.engine = response.data.car.engine;
                carObject.engine_size = response.data.car.engine_size;
                carObject.bhp = response.data.car.bhp;
                carObject.mpg_city = response.data.car.mpg_city;
                carObject.mpg_highway = response.data.car.mpg_highway;
                carObject.fuel_type = response.data.car.fuel_type;
                carObject.vehicle_id = response.data.car.vehicle_id;
                carObject.exterior_color = response.data.car.exterior_color;
                carObject.interior_color = response.data.car.interior_color;
                carObject.interior_material = response.data.car.interior_material;
                carObject.bed_length = response.data.car.bed_length;
                carObject.packages = response.data.car.packages;
                carObject.options = response.data.car.options;
                carObject.mileage = response.data.car.mileage;
                carObject.more_info_link = response.data.car.more_info_link;
                carObject.overall_grade = response.data.car.overall_grade
            
                listingObject.user = response.data.user;
                listingObject.photos = response.data.photos;
                listingObject.price = response.data.price.value;
                listingObject.views = response.data.views;
                listingObject.description = response.data.description;
                
                setListingObject({
                    ...listingObject
                })
                setCarObject({
                    ...carObject
                })
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
    }
    
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://sc-listingphotos.s3.amazonaws.com/test_images/car_hero.jpg" alt="..." />
                    <h3 className="card-title text-center"><strong>{carObject.year} {carObject.make} {carObject.model}</strong></h3>
                </div>

                <div className="col-md-6">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        
                        <table className="table table-striped">
                        <tbody>
                            <tr>
                            <th scope="row">Price</th>
                            <td>{listingObject.price}</td>
                            </tr>
                            <tr>
                            <th scope="row">Description</th>
                            <td>{listingObject.description}</td>
                            </tr>
                            <tr>
                            <th scope="row">Trim</th>
                            <td>{carObject.trim}</td>
                            </tr>
                            <tr>
                            <th scope="row">Fuel Type</th>
                            <td>{carObject.fuel}</td>
                            </tr>
                            <tr>
                            <th scope="row">Body Type</th>
                            <td>{carObject.body_type}</td>
                            </tr>
                            <tr>
                            <th scope="row">Transmission</th>
                            <td>{carObject.transmission}</td>
                            </tr>
                            <tr>
                            <th scope="row">Doors</th>
                            <td>{carObject.doors}</td>
                            </tr>
                            <tr>
                            <th scope="row">Horsepower</th>
                            <td>{carObject.bhp}</td>
                            </tr>
                            <tr>
                            <th scope="row">Engine Size</th>
                            <td>{carObject.engine_size}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )

};


export default Listing;