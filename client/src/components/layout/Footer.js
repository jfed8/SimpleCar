import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
    
    const authLinks = (
        <ul>
            <li><a onClick={ logoutUser } href="#!">Logout</a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )


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