import axios from "axios";

const state = {
    result: null,
};

const getters = {
    getResult: state => state.result,
};

const actions = {
    addAbsenceRequest: (context, absenceRequest) => {
        axios.post(`/medical-staff/absence-request`, absenceRequest)
        .then(resp => {
            context.commit('setResult', {label: 'absence', ok: true, message: "Successfully requested absence."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'absence', ok: false, message: err.response.data.ErrorMessage});
        });
    },
};

const mutations = {
    setResult: (state, result) => {
        state.result = result;
    },
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};