import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { PropTypes } from 'prop-types';


const Register = ({ register }) => {
    const [formData, updateFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const { first_name, last_name, email, password, confirm_password } = formData;

    // onChange Handler
    const onChange = e => updateFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    // onSubmit Handler
    const onSubmit = e => {
        e.preventDefault();
        if (password !== confirm_password) {
            console.log('Passwords do not match');
        } else {
            console.log(formData);
            register({ first_name, last_name, email, password });
        }
    }

    return (
        <div>
            <h1 className='large text-primary'>Register an Account</h1>
            <p className='cta'><i className='fas fa-address-card'></i>Enter your account info:</p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type='text' placeholder="First Name" name="first_name" value={first_name} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type='text' placeholder="Last Name" name="last_name" value={last_name} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type='email' placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type='password' placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type='password' placeholder="Confirm Password" name="confirm_password" value={confirm_password} onChange={e => onChange(e)} required />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="m">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
            <p className="m">
                Forgot your password? <Link to="/forgot_password">Recover Account</Link>
            </p>
        </div>
    )
};

Register.propTypes = {
    register: PropTypes.func.isRequired
}


export default connect(null, { register })(Register)