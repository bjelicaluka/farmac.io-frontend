import axios from "axios";

const state = {
    pharmacyAdmin: null,
    pharmacyAdmins: null,
    result: null,
    addResult: null,
    updateResult: null,
    deleteResult: null
};

const getters = {
    getPharmacyAdmin: state => state.pharmacyAdmin,
    getPharmacyAdmins: state => state.pharmacyAdmins,
    getResult: state => state.result,
    getAddResult: state => state.addResult,
    getUpdateResult: state => state.updateResult,
    getDeleteResult: state => state.deleteResult,
};

const actions = {
    getPharmacyAdmins: (context) => {
        axios.get(`/pharmacy-admins`)
        .then(response => {
            context.commit('setPharmacyAdmins', response.data);
            context.commit('setResult', { code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { code: error.response.status });
        });
    },

    getPharmacyAdminById: (context, id) => {
        axios.get(`/pharmacy-admins/${id}`)
        .then(response => {
            context.commit('setPharmacyAdmin', response.data);
            context.commit('setResult', {
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setResult', { code: error.response.status });
        });
    },

    addPharmacyAdmin: (context, pharmacyAdmin) => {
        axios.post(`/pharmacy-admins`, pharmacyAdmin)
        .then(response => {
            context.commit('setAddResult', {
                text: `You have successfully added a new pharmacy.`,
                code: response.status
            });
            context.dispatch('getPharmacyAdmins');
        })
        .catch(error => {
            context.commit('setAddResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    },
    updatePharmacyAdmin: (context, pharmacyAdmin) => {
        axios.put(`/pharmacy-admins`, pharmacyAdmin)
        .then(response => {
            context.commit('setUpdateResult', {
                text: `You have successfully updated a pharmacy.`,
                code: response.status
            });
            context.dispatch('getPharmacyAdmins');
        })
        .catch(error => {
            context.commit('setAddResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    },
    deletePharmacyAdmin: (context, id) => {
        axios.delete(`/pharmacy-admins/${id}`)
        .then(response => {
            context.commit('setDeleteResult', {
                text: `You have successfully deleted pharmacy.`,
                code: response.status
            });
            context.dispatch('getPharmacyAdmins');
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
    setPharmacyAdmin: (state, pharmacyAdmin) => {
        state.pharmacyAdmin = pharmacyAdmin;
    },
    setPharmacyAdmins: (state, pharmacyAdmins) => {
        state.pharmacyAdmins = pharmacyAdmins;
    },
    setResult: (state, result) => {
        state.result = result;
    },
    setAddResult: (state, result) => {
        state.addResult = result;
    },
    setUpdateResult: (state, result) => {
        state.updateResult = result;
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