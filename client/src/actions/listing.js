import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';


// Login Existing User
export const readVIN = ({ vin }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const body = JSON.stringify();

    try {
        const res = await axios.post('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + vin + '?format=json', body, config);
        
        dispatch({
            
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => alert(error.msg));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }

}