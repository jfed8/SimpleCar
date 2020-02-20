import React from 'react';
import axios from 'axios';


const DetailsEdit = (props) => {
    
    const { values, vin } = props;

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-10 col-md-8 col-lg-7 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Your Car Details</h5>
                        <hr class="my-4" />
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