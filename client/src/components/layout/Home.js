import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className='home'>
            <div className='dark-overlay'>
                <div className='home-inner'>
                    <h1 className='x1'>SimpleCar</h1>
                    <p className="cta">Sell Your Car!</p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'>Register</Link>
                        <Link to='/login' className='btn btn-primary'>Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home