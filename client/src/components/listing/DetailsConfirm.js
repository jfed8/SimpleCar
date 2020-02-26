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
                        <h5 className="card-title text-center"><strong>{values.year} {values.make} {values.model}</strong></h5>
                        
                        <table className="table table-striped">
                        <tbody>
                            <tr>
                            <th scope="row">Trim</th>
                            <td>{values.trim}</td>
                            </tr>
                            <tr>
                            <th scope="row">Fuel Type</th>
                            <td>{values.fuel}</td>
                            </tr>
                            <tr>
                            <th scope="row">Body Type</th>
                            <td>{values.body_type}</td>
                            </tr>
                            <tr>
                            <th scope="row">Transmission</th>
                            <td>{values.transmission}</td>
                            </tr>
                            <tr>
                            <th scope="row">Doors</th>
                            <td>{values.doors}</td>
                            </tr>
                            <tr>
                            <th scope="row">Horsepower</th>
                            <td>{values.bhp}</td>
                            </tr>
                            <tr>
                            <th scope="row">Engine Size</th>
                            <td>{values.engine_size}</td>
                            </tr>
                            <tr>
                            <th scope="row">Bed Length (Trucks)</th>
                            <td>{values.bed_length}</td>
                            </tr>
                        </tbody>
                        </table>

                        <hr className="my-4" />
                        <p className="text-center">
                            Are these details accurate?
                        </p>
                        <button className="btn form-style-btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={nextStep}>Yes! List My Car</button>
                        <button className="btn form-style-btn btn-lg btn-block text-uppercase" type="submit" onClick={prevStep}>I need to edit</button>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default DetailsEdit;