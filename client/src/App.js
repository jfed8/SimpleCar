import React, { useEffect }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store'

// Import Components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './helpers/setAuthToken';
import { loadUser } from './actions/auth';


// Set Authorization Token
if (localStorage.token) {
    setAuthToken(localStorage.token);
}


const App = () => {
    useEffect (() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
        <Router>
            <div className='App'>
                <Navbar />
                <Route exact path = '/' component={ Home } />
                <section className='container'>
                    <Switch>
                        <Route exact path='/register' component={ Register } />
                        <Route exact path='/login' component={ Login } />
                    </Switch>
                </section>
            </div>
        </Router>
        </Provider>
    );
}


export default App;