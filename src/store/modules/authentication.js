import axios from "axios";
import {setToken, removeToken} from '../../utils/token'

const state = {
    result: null
};

const getters = {
    getResult: state => state.result
};

const actions = {
    authenticate: (context, credentials) => {
        axios.post('/auth', credentials)
        .then(response => {
            setToken(response.data.token);
            
            context.commit('setResult', {
                label: 'authenticate',
                ok: true,
                message: ''
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'authenticate',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });        
    },

    logOut: (context) => {
        removeToken();
    },

    changePassword: (context, {id, newPassword, currentPassword}) => {
        axios.put(`/accounts/${id}/password`, {newPassword, currentPassword})
        .then(response => {
            context.commit('setResult', {
                label: 'changePassword',
                ok: true,
                message: 'You have succesfully changed your password.'
                
            });
        })
        .catch(error => {
            console.log(error);
            context.commit('setResult', {
                label: 'changePassword',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });   
    }
};

const mutations = {
    setResult: (state, response) => {
        state.result = response;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};