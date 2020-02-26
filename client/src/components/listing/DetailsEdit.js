import React from 'react';
import axios from 'axios';


const DetailsEdit = (props) => {
    
    const { values, vin } = props;

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 col-md-8 col-lg-7 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Your Car Details</h5>
                        <hr className="my-4" />
                        <p>

                            Edit Details

                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default DetailsEdit;