import axios from "axios"

const state = {
    result: {
        text: '',
        code: 0
    }
};

const getters = {
    getResult: state => state.result
};

const actions = {
    addPatient: (context, patient) => {
        axios.post('/accounts/create-patient', patient)
        .then(response => {
            context.commit('setResult', {
                text: `You have successfully created a new account. Please verify your account on the email.`,
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        })
    },
    updatePatient: (context, patient) => {
        console.log(`In next sprints...`);
    }
};

const mutations = {
    setResult: (state, result) => {
        state.result = result;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};
