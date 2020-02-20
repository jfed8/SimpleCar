import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VINLookup from './VINLookup';
import DetailsEdit from './DetailsEdit';
import DetailsConfirm from './DetailsConfirm';
import Axios from 'axios';


const NewListing = () => {

    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        step: 1,
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
        bhp: 0,
        mpg_city: 0,
        mpg_highway: 0,
        fuel_type: '',
        vehicle_id: '',
        exterior_color: '',
        interior_color: '',
        interior_material: '',
        packages: [],
        options: [],
        mileage: 0,
        more_info_link: '',
        overall_grade: 'N'
    })

    const decodeVIN = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        Axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + values.vin + '?format=json', config)
            .then(function (response) {
                // handle success
                console.log(response);

                // Save New Vehicle Details
                var json = response.data;
                for(var i = 0; i < json.Results.length; i++) {
                    if (json.Results[i].Variable === "Make") {
                        values.make = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Model Year") {
                        values.year = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Model") {
                        values.model = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Trim") {
                        values.trim = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Fuel Type - Primary") {
                        values.fuel = json.Results[i].Value;
                    }
                    else if (json.Results[i].Variable === "Engine Brake (hp)") {
                        values.bhp = json.Results[i].Value;
                    }

                    setValues({
                        ...values
                    });

                    // console.log(json.Results[i].Variable);
                }


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    const nextStep = (newValues) => {
        setValues({ ...values, ...newValues });
        setStep(step + 1);
        if (step === 1) {
            decodeVIN(values.vin.toString());
        }
    }

    const prevStep = (newValues) => {
        setValues({ ...values, ...newValues });
        setStep(step - 1);
    }

    // Handle Input Changes
    const handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        })
    }


    // Handle Changes to Form Path
    switch(step) {
        case 1:
            return (
                <VINLookup 
                    values={values}
                    nextStep={nextStep}
                    handleChange={handleChange}
                    setValues={setValues}
                    step={step}
                />
            )
        case 2:
            return (
                <DetailsConfirm 
                    values={values}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    setValues={setValues}
                    step={step}
                />
            )
        case 3:
            return (
                <DetailsEdit 
                    {...values}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    step={step}
                />
            )
        default:
            return (
                <h1>Confirmed!</h1>
            )

    }

};


export default NewListing;