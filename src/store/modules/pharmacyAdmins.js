import axios from "axios";

const state = {
    pharmacyAdmin: null,
    pharmacyAdmins: null,
    result: null
};

const getters = {
    getPharmacyAdmin: state => state.pharmacyAdmin,
    getPharmacyAdmins: state => state.pharmacyAdmins,
    getResult: state => state.result
};

const actions = {
    getPharmacyAdmins: (context) => {
        axios.get(`/pharmacy-admins`)
        .then(response => {
            context.commit('setPharmacyAdmins', response.data);
            context.commit('setResult', { label: 'get', code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { label: 'get', code: error.response.status });
        });
    },

    getPharmacyAdminById: (context, id) => {
        axios.get(`/pharmacy-admins/${id}`)
        .then(response => {
            context.commit('setPharmacyAdmin', response.data);
            context.commit('setResult', { label: 'get', code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { label: 'get', code: error.response.status });
        });
    },

    addPharmacyAdmin: (context, pharmacyAdmin) => {
        axios.post(`/pharmacy-admins`, pharmacyAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                text: `You have successfully added a new pharmacy.`,
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    },
    updatePharmacyAdmin: (context, pharmacyAdmin) => {
        axios.put(`/pharmacy-admins`, pharmacyAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                text: `You have successfully updated a pharmacy.`,
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'update',
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    },
    deletePharmacyAdmin: (context, id) => {
        axios.delete(`/pharmacy-admins/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                text: `You have successfully deleted pharmacy.`,
                code: response.status
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'delete',
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
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};