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
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <form className="form-signin" onSubmit={e => onSubmit(e)}>
                            <div className="form-label-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" value={email} onChange={e => onChange(e)} required autoFocus />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>

                            <div className="form-label-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                                <label htmlFor="inputPassword">Password</label>
                            </div>

                            <div className="custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                            </div>
                            
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            <hr className="my-4" />
                            <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                            <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                            <hr className="my-4" />
                            <p className="m">
                                Don't have an account? <Link to="/register">Create Account</Link>
                            </p>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
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