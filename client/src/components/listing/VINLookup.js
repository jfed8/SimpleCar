import React, { useState } from 'react';

const VINLookup = (props) => {
    const { values, vin, nextStep, handleChange } = props;

    // onChange Handler
    const onChange = e => handleChange({
        ...values,
        [e.target.name]: e.target.value
    });

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Enter VIN</h5>
                        <form class="form-signin" onSubmit={nextStep}>
                            <div class="form-label-group">
                                <input type="text" id="inputVIN" class="form-control" placeholder="VIN" name="vin" onChange={e => onChange(e)} required />
                                <label for="inputVIN">VIN</label>
                            </div>
                            
                            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">List My Car!</button>
                            <hr class="my-4" />
                            <p className="m">
                                
                            </p>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default VINLookup;