import React from 'react';
import axios from 'axios';


const FinishListing = (props) => {
    
    const { listingValues, nextStep, prevStep, setListingValues, handleChange, step, finishListing } = props;

    const onChange = e => {
        setListingValues({
            ...listingValues,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 col-md-8 col-lg-7 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Finish Listing</h5>
                        <hr className="my-4" />
                        <form className="form-signin" onSubmit={e => finishListing(e)}>
                            <div className="form-label-group">
                                <input type="text" id="inputPrice" className="form-control" placeholder="$$$" name="price" onChange={e => onChange(e)} defaultValue={listingValues.price} required />
                                <label htmlFor="inputPrice">Price</label>
                            </div>
                            <div className="form-label-group">
                                <textarea type="text" rows="8" cols="50" id="inputDesc" className="form-control" placeholder="Description" name="description" onChange={e => onChange(e)} defaultValue={listingValues.description} required />
                                
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



export default FinishListing;