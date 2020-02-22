import React from 'react';
import axios from 'axios';
import ReactS3 from 'react-s3';


const AddPhotos = (props) => {
    
    const { carValues, listingValues, nextStep } = props;

    const config = {
        bucketName: 'sc-listingphotos',
        albumName: carValues.vin,
        region: 'us-east-1',
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    }

    const upload = (e) => {
        ReactS3.uploadFile( e.target.files, config )
        .then( (data) => {
            console.log(data);
        })
        .catch( (err) => {
            alert(err);
        })
        .then( () => {
            nextStep();
        });
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-10 col-md-8 col-lg-7 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Add Photos</h5>
                        <input type="file" />
                        <hr class="my-4" />
                        <button className="btn form-style-btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={upload}>Done!</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default AddPhotos;