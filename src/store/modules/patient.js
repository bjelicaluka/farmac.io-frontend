import axios from "axios"

const state = {
    result: null
};

const getters = {
    getResult: state => state.result
};

const actions = {
    addPatient: (context, patient) => {
        axios.post('/accounts/create-patient', patient)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully created a new account. Please verify your account on the email.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
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
