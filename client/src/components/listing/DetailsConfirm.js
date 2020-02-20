import React from 'react';
import axios from 'axios';


const DetailsEdit = (props) => {
    
    const { values, nextStep, prevStep, setValues, handleChange, step } = props;

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 col-md-8 col-lg-7 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">{values.year} {values.make} {values.model}</h5>
                        <p className="text-center"><small>{values.trim}</small></p>
                        <hr className="my-4" />
                        <p className="text-center">
                            Are these details accurate?
                        </p>
                        <button className="btn form-style-btn btn-lg btn-primary btn-block text-uppercase" type="submit">Yes! List My Car</button>
                        <button className="btn form-style-btn btn-lg btn-block text-uppercase" type="submit">I need to edit</button>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default DetailsEdit;