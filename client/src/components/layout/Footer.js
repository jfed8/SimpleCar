import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';


const Footer = ({ auth: { isAuthenticated, loading }, logoutUser }) => {


    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'> <i className='fas fa-book-reader'></i> SimpleCar</Link>
            </h1>
            { !loading && (<div>{ isAuthenticated ? authLinks : guestLinks }</div>) }
        </nav>
    )
}




export default Footer;