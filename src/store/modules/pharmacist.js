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
    fetchPharmacists: (context) => {
        axios.get(`/pharmacists`)
        .then(resp => {
            context.commit('setPharmacists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacistById: (context, id) => {
        axios.get(`/pharmacist/${id}`)
        .then(resp => {
            context.commit('setPharmacist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyPharmacists: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/pharmacists`)
        .then(resp => {
            context.commit('setPharmacists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyPharmacistById: (context, {pharmacyId, pharmacistId}) => {
        axios.get(`/pharmacies/${pharmacyId}/pharmacist/${pharmacistId}`)
        .then(resp => {
            context.commit('setPharmacist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchPharmacistsByName: (context, name) => {
        axios.get(`/pharmacists/search?name=${name}`)
        .then(resp => {
            context.commit('setPharmacists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchPharmacyPharmacistsByName: (context, {pharmacyId, name}) => {
        axios.get(`/pharmacies/${pharmacyId}/pharmacists/search?name=${name}`)
        .then(resp => {
            context.commit('setPharmacists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addPharmacist: (context, pharmacist) => {
        axios.post(`/pharmacists`, pharmacist)
        .then(resp => {
            context.commit('setResult', {label: 'add', ok: true, message: "Successfully registered pharmacist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'add', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    updatePharmacist: (context, pharmacist) => {
        axios.put(`/pharmacists`, pharmacist)
        .then(resp => {
            context.commit('setResult', {label: 'update', ok: true, message: "Successfully updated pharmacist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'update', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    deletePharmacist: (context, id) => {
        axios.delete(`/pharmacists/${id}`)
        .then(resp => {
            context.commit('setResult', {label: 'delete', ok: true, message: "Successfully deleted pharmacist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'delete', ok: false, message: err.response.data.ErrorMessage});
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