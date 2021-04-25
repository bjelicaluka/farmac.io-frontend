import axios from "axios";


const state = {
    result: null
};

const getters = {
    getResult: state => state.result,
};

const actions = {
    getVerificationEmail: (context, email) => {
        axios.get(`/email-verification?email=${email}`)
        .then(response => {
            context.commit('setResult', {
                label: 'getVerificationEmail',
                ok: true,
                message: `Verification email is successfully sent to ${email}.`             
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'getVerificationEmail',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    tryToVerifyEmail: (context, token) => {
        const axiosWithoutInterceptors = axios.create();
        axiosWithoutInterceptors.put('/email-verification', {},
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            context.commit('setResult', {
                label: 'verification',
                ok: true,
                message: `Email is successfully verified.`             
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'verification',
                ok: false,
                message: error.response.data.ErrorMessage         
            });
        });        
    }
};

const mutations = {
    setResult: (state, response) => {
        state.result = response;
    },

};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};