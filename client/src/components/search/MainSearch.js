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
        listings: []
    });

    const searchNow = (e) => {
        e.preventDefault();

        values.listings = []
        updateValues({
            ...values
        })

        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        
        const body = JSON.stringify({ term: e.target.value });
    
        Axios.post('/api/search/', body, config)
        .then( (response) => {
            console.log(response.data);

            // updateValues({
            //     listings: JSON.parse(response.data)
            // });

            response.data.forEach(listing => {
                console.log(listing);
                values.listings.push(listing)
                updateValues({
                    ...values
                })

                console.log(values.listings);
            })

        }) 
        .catch( (err) => {
            console.log(err);
        })
    }
    
    var tempKey = 0;

    const resultCards = values.listings.map(function(listing){

        const listingLink = "/listing/" + listing.car.vin;
        tempKey = tempKey + 1;

        return (
            <div className="card search-result-card" key={ tempKey }>
                <Link to={listingLink} >
                    <img src="https://sc-listingphotos.s3.amazonaws.com/test_images/car_hero.jpg" className="card-img-top" alt="..." />
                    <h3 className="card-title text-center"><strong>{listing.car.make} {listing.car.model}</strong></h3>
                    <div className="card-body">
                        <p className="card-text">{listing.description}</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">{listing.views ? listing.views : 0} views</small>
                    </div>
                    <div className="card-badge">{listing.car.year}</div>
                </Link>
            </div>
        )
    })


    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="searchbar">
                    <input className="search_input" type="text" name="" placeholder="Search..." onChange={e => searchNow(e)} />
                    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                </div>

                <div className="searchResults col-md-11 card-columns">
                    { resultCards }
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