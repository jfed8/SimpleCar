import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';


const MainSearch = ({ isAuthenticated }) => {
    
    // // Redirect if user is not logged in
    // if (!isAuthenticated) {
    //     return <Redirect to="/login" />
    // }

    const [ values, updateValues ] = useState({
        cars: []
    });

    const searchNow = (e) => {
        e.preventDefault();
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        
        const body = JSON.stringify({ term: e.target.value });
    
        Axios.post('/api/search/', body, config)
        .then( (response) => {
            updateValues({
                cars: JSON.parse(response.body)
            });
        }) 
        .catch( (err) => {
            console.log(err);
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="searchbar">
                    <input className="search_input" type="text" name="" placeholder="Search..." onChange={e => searchNow(e)} />
                    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                </div>

                <div className="searchResults col-md-10">
                    <div className="card">
                        <img src="..." class="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

MainSearch.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {})(MainSearch);