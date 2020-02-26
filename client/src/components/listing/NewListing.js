import React, { useState } from 'react';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VINLookup from './VINLookup';
import DetailsEdit from './DetailsEdit';
import DetailsConfirm from './DetailsConfirm';
import FinishListing from './FinishListing';
import AddPhotos from './AddPhotos';
import Axios from 'axios';
import util from 'util';

const NewListing = ({ auth: { isAuthenticated, loading, user } }, props) => {
    const history = useHistory();

    const [step, setStep] = useState(1);
    const [carValues, setCarValues] = useState({
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

    const [listingValues, setListingValues] = useState({
        // Set Default Listing Values
        user: user ? user._id : '',
        photos: [],
        price: 0,
        views: 0,
        description: ''
    });

    const decodeVIN = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        Axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + carValues.vin + '?format=json', config)
            .then(function (response) {
                // handle success
                console.log(response);

                // Save New Vehicle Details
                var json = response.data;
                for(var i = 0; i < json.Results.length; i++) {
                    if (json.Results[i].Variable === "Make") {
                        carValues.make = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Model Year") {
                        carValues.year = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Model") {
                        carValues.model = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Trim") {
                        carValues.trim = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Fuel Type - Primary") {
                        carValues.fuel = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Engine Brake (hp)") {
                        carValues.bhp = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Body Class") {
                        carValues.body_type = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Doors") {
                        carValues.doors = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Drive Type") {
                        carValues.transmission = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Displacement (L)") {
                        carValues.engine_size = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Bed Length (inches)") {
                        carValues.bed_length = json.Results[i].Value;
                    }

                    setCarValues({
                        ...carValues
                    });

                    // console.log(json.Results[i].Variable);
                }


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    const nextStepCar = (newValues) => {
        setCarValues({ ...carValues, ...newValues });
        setStep(step + 1);
        if (step === 1) {
            decodeVIN(carValues.vin.toString());
        }
    }

    const prevStepCar = (newValues) => {
        setCarValues({ ...carValues, ...newValues });
        setStep(step - 1);
    }

    const nextStepListing = (newValues) => {
        setListingValues({ ...listingValues, ...newValues });
        setStep(step + 1);
    }

    const prevStepListing = (newValues) => {
        setListingValues({ ...listingValues, ...newValues });
        setStep(step - 1);
    }

    // Handle Input Changes
    const handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        })
    }

    const finishListing = (e) => {
        e.preventDefault();
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        // console.log(util.inspect(carValues));
        const { 
            vin,
            make,
            model,
            year,
            trim,
            body_type,
            category,
            transmission,
            drivetrain,
            doors,
            engine,
            engine_size,
            bhp,
            mpg_city,
            mpg_highway,
            fuel_type,
            vehicle_id,
            exterior_color,
            interior_color,
            interior_material,
            bed_length,
            packages,
            options,
            mileage,
            more_info_link,
            overall_grade } = carValues;

        const { 
            user,
            price,
            views,
            description
        } = listingValues;

        // const car_json = JSON.stringify({
            
        // });
        const body = JSON.stringify({ 
            user,
            price,
            views,
            description,
            car: {
                vin,
                make,
                model,
                year,
                trim,
                body_type,
                category,
                transmission,
                drivetrain,
                doors,
                engine,
                engine_size,
                bhp,
                mpg_city,
                mpg_highway,
                fuel_type,
                vehicle_id,
                exterior_color,
                interior_color,
                interior_material,
                bed_length,
                packages,
                options,
                mileage,
                more_info_link,
                overall_grade
            }
         });

         console.log(body);
    
        Axios.post('/api/listings/create', body, config)
        .then( () => {
            console.log("Car Created!!! WAHOO!!");
        }) 
        .catch( (err) => {
            console.log(err);
        })
        .then( () => {
            history.push("/");
        });
    }


    // Handle Changes to Form Path
    switch(step) {
        case 1:
            return (
                <VINLookup 
                    values={carValues}
                    nextStep={nextStepCar}
                    handleChange={handleChange}
                    setValues={setCarValues}
                    step={step}
                />
            )
        case 2:
            return (
                <DetailsConfirm 
                    values={carValues}
                    nextStep={nextStepCar}
                    prevStep={prevStepCar}
                    handleChange={handleChange}
                    setValues={setCarValues}
                    step={step}
                />
            )
        case 3:
            return (
                <AddPhotos 
                    listingValues={listingValues}
                    carValues={carValues}
                    setListingValues={setListingValues}
                    nextStep={nextStepListing}
                    prevStep={prevStepListing}
                    step={step}
                />
            )
        case 4:
            return (
                <FinishListing 
                    carValues={carValues}
                    listingValues={listingValues}
                    nextStep={nextStepListing}
                    prevStep={prevStepListing}
                    handleChange={handleChange}
                    setValues={setCarValues}
                    setListingValues={setListingValues}
                    step={step}
                    finishListing={finishListing}
                />
            )
        default:
            return (
                <h1>Confirmed!</h1>
            )

    }

};

NewListing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, {})(NewListing);;