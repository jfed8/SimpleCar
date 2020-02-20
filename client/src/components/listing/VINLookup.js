import React, { useState } from 'react';

const VINLookup = (props) => {
    const { values, nextStep, setValues, handleChange, step } = props;


    const onChange = e => {
        setValues({
            ...values,
            vin: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Enter VIN</h5>
                        <form className="form-signin" onSubmit={nextStep}>
                            <div className="form-label-group">
                                <input type="text" id="inputVIN" className="form-control" placeholder="VIN" name="vin" onChange={e => onChange(e)} defaultValue={values.vin} required />
                                <label htmlFor="inputVIN">VIN</label>
                            </div>
                            
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">List My Car!</button>
                            <hr className="my-4" />
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