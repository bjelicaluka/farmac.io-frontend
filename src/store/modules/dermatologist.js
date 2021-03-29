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
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchDermatologistById: (context, id) => {
        axios.get(`/dermatologist/${id}`)
        .then(resp => {
            context.commit('setDermatologist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyDermatologists: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyDermatologistById: (context, {pharmacyId, dermatologistId}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologist/${dermatologistId}`)
        .then(resp => {
            context.commit('setDermatologist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchDermatologistsByName: (context, name) => {
        axios.get(`/dermatologists/search?name=${name}`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchPharmacyDermatologistsByName: (context, {pharmacyId, name}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists/search?name=${name}`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addDermatologistToPharmacy: (context, {dermatologistId, pharmacyId, workTime}) => {
        axios.post(`/pharmacies/${pharmacyId}/dermatologists/${dermatologistId}`, workTime)
        .then(resp => {
            context.commit('setResult', {label: 'addToPharmacy', ok: true, message: "Successfully added dermatologist to pharmacy."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addToPharmacy', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    removeDermatologistFromPharmacy: (context, {dermatologistId, pharmacyId}) => {
        axios.delete(`/pharmacies/${pharmacyId}/dermatologists/${dermatologistId}`)
        .then(resp => {
            context.commit('setResult', {label: 'removeFromPharmacy', ok: true, message: "Successfully removed dermatologist from pharmacy."});
        })
        .catch(err => {
            console.log(err)
            context.commit('setResult', {label: 'removeFromPharmacy', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addDermatologist: (context, dermatologist) => {
        axios.post(`/dermatologists`, dermatologist)
        .then(resp => {
            context.commit('setResult', {label: 'add', ok: true, message: "Successfully registered dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'add', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    updateDermatologist: (context, dermatologist) => {
        axios.put(`/dermatologists`, dermatologist)
        .then(resp => {
            context.commit('setResult', {label: 'update', ok: true, message: "Successfully updated dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'update', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    deleteDermatologist: (context, id) => {
        axios.delete(`/dermatologists/${id}`)
        .then(resp => {
            context.commit('setResult', {label: 'delete', ok: true, message: "Successfully deleted dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'delete', ok: false, message: err.response.data.ErrorMessage});
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