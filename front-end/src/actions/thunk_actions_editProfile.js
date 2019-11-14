import { GETINFOSUSER, EDITUSER } from '../constantes';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
// import Cookies from 'universal-cookie';

export const getInfosUser = (data) => {
    return {
        type: GETINFOSUSER,
        data: data
    };
};

export const editInfosUser = (data) => {
    return {
        type: EDITUSER,
        data: data
    };
};

// ACTION FOR GET INFOS USER

export const thunk_getInfosUser = (username) => {
    return function (dispatch) {
        return axios.get(`/api/users/profile/${username}`).then(({ data }) => {
            if (data.success) {
                dispatch(getInfosUser(data));
            }
        })
    };
};

// ACTION FOR EDIT USER

export const thunk_editInfosUser = (userData) => {
    console.log(userData);
    
    return function (dispatch) {
        axios.post('/api/update', userData).then(({ data }) => {
            const { success, message } = data;
            if (success) {
                dispatch(editInfosUser(data));
                NotificationManager.success(message, 'Success !', 3000);
            }
            else
                NotificationManager.error(message, 'Sorry but...', 3000);
        })
        .catch(err => console.error('Error: ', err));
    };
};