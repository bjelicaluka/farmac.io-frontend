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
                message: `Verification email is successfully sent to ${email}.`,
                ok: true
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'getVerificationEmail',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        });
    },

    tryToVerifyEmail: (context, token) => {
        axios.put('/email-verification', {},
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            context.commit('setResult', {
                label: 'verification',
                message: `Email is successfully verified.`,
                ok: true
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'verification',
                message: error.response.data.ErrorMessage,
                ok: false
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