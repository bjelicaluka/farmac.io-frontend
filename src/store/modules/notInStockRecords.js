import axios from "axios";

const state = {
    result: null,
    notInStockRecords: null
};

const getters = {
    getResult: state => state.result,
    getNotInStockRecords: state => state.notInStockRecords
};

const actions = {
    fetchNotInStockRecordsForPharmacy: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/not-in-stocks`)
        .then(resp => {
            context.commit('setNotInStockRecords', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    markNotInStockRecordAsSeen: (context, notInStockRecordId) => {
        axios.put(`/not-in-stocks/${notInStockRecordId}/seen`, {})
        .then(resp => {
            context.commit('setResult', {label: 'markSeen', ok: true, message: "Successfully marked not in stock record as seen."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'markSeen', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    
};

const mutations = {
    setResult: (state, result) => {
        state.result = result;
    },
    setNotInStockRecords: (state, notInStockRecords) => {
        state.notInStockRecords = notInStockRecords;
    },
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};