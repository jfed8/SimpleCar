import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';


const Login = ({ loginUser, isAuthenticated }) => {
    const [formData, updateFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    // onChange Handler
    const onChange = e => updateFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    // onSubmit Handler
    const onSubmit = e => {
        e.preventDefault();
        // console.log("Logging in...");

        loginUser({ email, password });
    }

    // Redirect if user is already logged in
    if (isAuthenticated) {
        return <Redirect to="/welcome" />
    }

    return (
        <div>
            <h1 className='large text-primary'>Log In</h1>
            <p className='cta'><i className='fas fa-address-card'></i>Log in to your account:</p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type='email' placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type='password' placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                </div>
                <input type="submit" className="btn btn-primary" value="Log In" />
            </form>
            <p className="m">
                Don't have an account yet? <Link to="/register">Register</Link>
            </p>
            <p className="m">
                Forgot your password? <Link to="/forgot_password">Recover Account</Link>
            </p>
        </div>
    )
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { loginUser })(Login);