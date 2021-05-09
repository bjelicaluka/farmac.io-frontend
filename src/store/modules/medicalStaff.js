import axios from "axios";

const state = {
    result: null,
    absenceRequests: null
};

const getters = {
    getResult: state => state.result,
    getAbsenceRequests: state => state.absenceRequests
};

const actions = {
    fetchAbsenceRequestsForPharmacy: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/absence-requests`)
        .then(resp => {
            context.commit('setAbsenceRequests', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },

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
    setAbsenceRequests: (state, absenceRequests) => {
        state.absenceRequests = absenceRequests;
    },
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};