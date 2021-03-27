import axios from "axios";

const state = {
    dermatologist: null,
    dermatologists: null,
    result: null
};

const getters = {
    getDermatologist: state => state.dermatologist,
    getDermatologists: state => state.dermatologists,
    getResult: state => state.result,
};

const actions = {
    fetchDermatologists: (context) => {
        axios.get(`/dermatologists`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchDermatologistById: (context, id) => {
        axios.get(`/dermatologist/${id}`)
        .then(resp => {
            context.commit('setDermatologist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyDermatologists: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyDermatologistById: (context, {pharmacyId, dermatologistId}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologist/${dermatologistId}`)
        .then(resp => {
            context.commit('setDermatologist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchDermatologistsByName: (context, name) => {
        axios.get(`/dermatologists/search?name=${name}`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchPharmacyDermatologistsByName: (context, {pharmacyId, name}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists/search?name=${name}`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addDermatologist: (context, dermatologist) => {
        axios.post(`/dermatologists`, dermatologist)
        .then(resp => {
            context.commit('setResult', {ok: true, message: "Successfully registered dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    updateDermatologist: (context, dermatologist) => {
        axios.put(`/dermatologists`, dermatologist)
        .then(resp => {
            context.commit('setResult', {ok: true, message: "Successfully updated dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
    deleteDermatologist: (context, id) => {
        axios.delete(`/dermatologists/${id}`)
        .then(resp => {
            context.commit('setResult', {ok: true, message: "Successfully deleted dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {ok: false, message: err.response.data.ErrorMessage});
        });
    },
};

const mutations = {
    setDermatologist: (state, dermatologist) => {
        state.dermatologist = dermatologist;
    },
    setDermatologists: (state, dermatologists) => {
        state.dermatologists = dermatologists;
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