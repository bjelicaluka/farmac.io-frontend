import axios from "axios";

const state = {
    examinationReports: null,
    result: null
};

const getters = {
    getExaminationReports: state => state.examinationReports,
    getResult: state => state.result
};

const actions = {

    fetchExaminationReports: (context, {pharmacyId, timePeriod}) => {
        axios.post(`/pharmacy/${pharmacyId}/examination-report`, timePeriod)
        .then(response => {
            context.commit('setExaminationReports', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

};

const mutations = {
    setExaminationReports: (state, examinationReports) => {
        state.examinationReports = examinationReports;
    },
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