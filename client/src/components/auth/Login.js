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
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Sign In</h5>
                        <form class="form-signin" onSubmit={e => onSubmit(e)}>
                            <div class="form-label-group">
                                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" name="email" value={email} onChange={e => onChange(e)} required autofocus />
                                <label for="inputEmail">Email address</label>
                            </div>

                            <div class="form-label-group">
                                <input type="password" id="inputPassword" class="form-control" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                                <label for="inputPassword">Password</label>
                            </div>

                            <div class="custom-control custom-checkbox mb-3">
                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                <label class="custom-control-label" for="customCheck1">Remember password</label>
                            </div>
                            
                            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            <hr class="my-4" />
                            <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                            <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                            <hr class="my-4" />
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