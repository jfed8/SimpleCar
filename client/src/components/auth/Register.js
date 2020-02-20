import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { PropTypes } from 'prop-types';


const Register = ({ register, isAuthenticated }) => {
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

    // Redirect if user is already logged in
    if (isAuthenticated) {
        return <Redirect to="/welcome" />
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Register New Account</h5>
                        <form class="form-signin" onSubmit={e => onSubmit(e)}>
                            <div className="form-label-group">
                                <input type='text' id="inputFirstName" class="form-control" placeholder="First Name" name="first_name" value={first_name} onChange={e => onChange(e)} required />
                                <label for="inputFirstName">First Name</label>
                            </div>
                            <div className="form-label-group">
                                <input type='text' id="inputLastName" class="form-control" placeholder="Last Name" name="last_name" value={last_name} onChange={e => onChange(e)} required />
                                <label for="inputLastName">Last Name</label>
                            </div>
                            <div className="form-label-group">
                                <input type='email' id="inputEmail" class="form-control" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
                                <label for="inputEmail">Email address</label>
                            </div>
                            <div className="form-label-group">
                                <input type='password' id="inputPassword" class="form-control" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                                <label for="inputPassword">Password</label>
                            </div>
                            <div className="form-label-group">
                                <input type='password' id="inputConfirmPassword" class="form-control" placeholder="Confirm Password" name="confirm_password" value={confirm_password} onChange={e => onChange(e)} required />
                                <label for="inputConfirmPassword">Confirm Password</label>
                            </div>
                            <input type="submit" className="btn btn-lg btn-primary btn-block text-uppercase" value="Register" />
                        </form>
                        <hr class="my-4" />
                        <p className="m">
                            Already have an account? <Link to="/login">Log In</Link>
                        </p>
                        <p className="m">
                            Forgot your password? <Link to="/forgot_password">Recover Account</Link>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register)