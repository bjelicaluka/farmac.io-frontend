import axios from "axios";

const PAGE_SIZE = 5;

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

    fetchAbsenceRequestsPageForPharmacy: (context, {pharmacyId, page}) => {
        axios.get(`/pharmacies/${pharmacyId}/absence-requests/page`, {params: {number: page, size: PAGE_SIZE}})
        .then(resp => {
            context.commit('setAbsenceRequests', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    acceptAbsenceRequest: (context, absenceRequestId) => {
        axios.post(`/medical-staff/absence-requests/${absenceRequestId}/accept`, {})
        .then(resp => {
            context.commit('setResult', {label: 'acceptAbsenceRequest', ok: true, message: "Successfully accepted absence request."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'acceptAbsenceRequest', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    declineAbsenceRequest: (context, {absenceRequestId, reason}) => {
        axios.post(`/medical-staff/absence-requests/${absenceRequestId}/decline`, {reason})
        .then(resp => {
            context.commit('setResult', {label: 'declineAbsenceRequest', ok: true, message: "Successfully declined absence request."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'declineAbsenceRequest', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    addAbsenceRequest: (context, absenceRequest) => {
        axios.post(`/medical-staff/absence-requests`, absenceRequest)
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