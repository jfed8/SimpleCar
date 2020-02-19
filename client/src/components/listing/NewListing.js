import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VINLookup from './VINLookup';
import DetailsEdit from './DetailsEdit'
import Axios from 'axios';


const NewListing = () => {

    const {
        vin,
        model,
        year,
        trim,
        body_type,
        category,
        transmission,
        drivetrain,
        doors,
        engine,
        mpg_city,
        mpg_highway,
        fuel_type,
        vehicle_id,
        exterior_color,
        interior_color,
        interior_material,
        packages,
        options,
        mileage,
        more_info_link,
        overall_grade
    } = {
        step: 1,
        vin: '',
        model: '',
        year: 1900,
        trim: '',
        body_type: '',
        category: '',
        transmission: '',
        drivetrain: '',
        doors: 0,
        engine: '',
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
    };

    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        vin,
        model,
        year,
        trim,
        body_type,
        category,
        transmission,
        drivetrain,
        doors,
        engine,
        mpg_city,
        mpg_highway,
        fuel_type,
        vehicle_id,
        exterior_color,
        interior_color,
        interior_material,
        packages,
        options,
        mileage,
        more_info_link,
        overall_grade
    })

    const nextStep = (newValues) => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        Axios.post('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + vin + '?format=json', [], config)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        setValues({ ...values, ...newValues });
        setStep(step + 1);
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
                    {...values}
                    nextStep={nextStep}
                    handleChange={handleChange}
                    step={step}
                />
            )
        case 2:
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