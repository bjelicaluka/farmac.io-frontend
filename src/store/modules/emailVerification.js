import axios from "axios";

const state = {
    getVerificationEmailResponse: {
        text: '',
        code: 0
    },
    verifyEmailResponse: {
        text: '',
        code: 0
    }
};

const getters = {
    getGetVerificationEmailResponse: state => { return state.getVerificationEmailResponse; },
    getVerifyEmailResponse: state => { return state.verifyEmailResponse; }
};

const actions = {
    getVerificationEmail: (context, email) => {
        axios.get(`/email-verification?email=${email}`)
        .then(response => {
            context.commit('setGetVerificationEmailResponse', {
                text: `Verification email is successfully sent to ${email}.`,
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setGetVerificationEmailResponse', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
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
            context.commit('setVerifyEmailReponse', {
                text: `Email is successfully verified.`,
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setVerifyEmailReponse', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });        
    }
};

const mutations = {
    setGetVerificationEmailResponse: (state, response) => {
        state.getVerificationEmailResponse = response;
    },

    setVerifyEmailReponse: (state, response) => {
        state.verifyEmailResponse = response;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};