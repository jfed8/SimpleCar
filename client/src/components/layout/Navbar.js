import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading, user }, logoutUser }) => {
    
    const authLinks = (
        <ul>
            <li>Welcome{user ? " " + user.first_name : ""}!</li>
            <li> <a onClick={ logoutUser } href="/#!">Logout</a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )


    return (
        <nav className='navbar'>
            <Link to='/' className="navbar-brand" ><img src={require('./../../assets/SimpleCarLogo-Full.jpeg')} /></Link>
            { !loading && (<div>{ isAuthenticated ? authLinks : guestLinks }</div>) }
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, {logoutUser})(Navbar);