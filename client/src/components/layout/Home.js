import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <br />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <Link to="/newlisting" className="btn btn-lg btn-primary form-style-btn btn-block text-uppercase">List a Car</Link>
                </div>
            </div>
        </div>
    )
}

export default Home