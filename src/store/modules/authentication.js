import axios from "axios";
import {setToken, setAxiosInterceptors} from '../../utils/localStorage'

const state = {
    result: {
        ok: false,
        message: '',
        label: ''
    }
};

const getters = {
    getResult: state => { return state.result; }
};

const actions = {
    authenticate: (context, credentials) => {
        axios.post('/auth', credentials)
        .then(response => {
            setToken(response.data.token);
            setAxiosInterceptors();
            
            context.commit('setResult', {
                message: '',
                ok: true,
                label: 'authenticate'
            });
        })
        .catch(error => {
            context.commit('setResult', {
                message: error.response.data.ErrorMessage,
                ok: false,
                label: 'authenticate'
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