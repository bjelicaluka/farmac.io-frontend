import axios from "axios";

const state = {
    pharmacist: null,
    pharmacists: null,
    result: null
};

const getters = {
    getPharmacist: state => state.pharmacist,
    getPharmacists: state => state.pharmacists,
    getResult: state => state.result,
};

const actions = {
    getPharmacists: (context) => {
        axios.get(`/pharmacists`)
        .then(resp => {
            context.commit('setResult', {ok: true});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.message});
        });
    },
    getPharmacistById: (context, id) => {
        axios.get(`/pharmacist/${id}`)
        .then(resp => {
            context.commit('setPharmacist', resp.data);
            context.commit('setResult', {ok: true});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.message});
        });
    },
    addPharmacist: (context, pharmacist) => {
        axios.post(`/pharmacists`, pharmacist)
        .then(resp => {
            context.commit('setResult', {ok: true});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.message});
        });
    },
    updatePharmacist: (context, pharmacist, id) => {
        axios.put(`/pharmacists/${id}`, pharmacist)
        .then(resp => {
            context.commit('setResult', {ok: true});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.message});
        });
    },
    deletePharmacist: (context, id) => {
        axios.delete(`/pharmacists/${id}`)
        .then(resp => {
            context.commit('setResult', {ok: true});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.message});
        });
    },
};

const mutations = {
    setPharmacist: (state, pharmacist) => {
        state.pharmacist = pharmacist;
    },
    setPharmacists: (state, pharmacists) => {
        state.pharmacists = pharmacists;
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