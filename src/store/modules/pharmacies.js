import axios from "axios";

const state = {
    pharmacy: null,
    pharmacies: null,
    result: null,
    addResult: null,
    deleteResult: null
};

const getters = {
    getPharmacy: state => state.pharmacy,
    getPharmacies: state => state.pharmacies,
    getResult: state => state.result,
    getAddResult: state => state.addResult,
    getDeleteResult: state => state.deleteResult,
};

const actions = {
    getPharmacies: (context) => {
        axios.get(`/pharmacies/home`)
        .then(response => {
            context.commit('setPharmacies', response.data);
            context.commit('setResult', { code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { code: error.response.status });
        });
    },

    getPharmacyById: (context, id) => {
        axios.get(`/pharmacies/${id}`)
        .then(response => {
            context.commit('setPharmacy', response.data);
            context.commit('setResult', {
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setResult', { code: error.response.status });
        });
    },

    addPharmacy: (context, pharmacy) => {
        axios.post(`/pharmacies`, pharmacy)
        .then(response => {
            context.commit('setAddResult', {
                text: `You have successfully added a new pharmacy.`,
                code: response.status
            });
            context.dispatch('getPharmacies');
        })
        .catch(error => {
            context.commit('setAddResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    },
    updatePharmacy: (context, {pharmacy, id}) => {
        // Bjelica
    },
    deletePharmacy: (context, id) => {
        axios.delete(`/pharmacies/${id}`)
        .then(response => {
            context.commit('setDeleteResult', {
                text: `You have successfully deleted pharmacy.`,
                code: response.status
            });
            context.dispatch('getPharmacies');
        })
        .catch(error => {
            context.commit('setDeleteResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    },
};

const mutations = {
    setPharmacy: (state, pharmacy) => {
        state.pharmacy = pharmacy;
    },
    setPharmacies: (state, pharmacies) => {
        state.pharmacies = pharmacies;
    },
    setResult: (state, result) => {
        state.result = result;
    },
    setAddResult: (state, result) => {
        state.addResult = result;
    },
    setDeleteResult: (state, result) => {
        state.deleteResult = result;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};