import axios from "axios";
import {setToken, setAxiosInterceptors} from '../../utils/token'

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
            setAxiosInterceptors();
            
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