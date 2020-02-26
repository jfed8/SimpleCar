import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Welcome = ({ isAuthenticated }) => {
    
    // Redirect if user is not logged in
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <Link to="/newlisting" className="btn btn-lg btn-primary form-style-btn btn-block text-uppercase">List a Car</Link>
                    <br />
                    <Link to="/search" className="btn btn-lg btn-primary form-style-btn btn-block text-uppercase">Buy a Car</Link>
                </div>
            </div>
        </div>
    )
};

Welcome.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {})(Welcome);