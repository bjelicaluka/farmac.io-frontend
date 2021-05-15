import axios from "axios";

const PAGE_SIZE = 5;

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
    fetchPharmacyAdmins: (context) => {
        axios.get(`/pharmacy-admins`)
        .then(response => {
            context.commit('setPharmacyAdmins', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyAdminsPage: (context, page) => {
        axios.get(`/pharmacy-admins/page`, {params: {number: page, size: PAGE_SIZE}})
        .then(response => {
            context.commit('setPharmacyAdmins', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyAdminById: (context, id) => {
        axios.get(`/pharmacy-admins/${id}`)
        .then(response => {
            context.commit('setPharmacyAdmin', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addPharmacyAdmin: (context, pharmacyAdmin) => {
        axios.post(`/pharmacy-admins`, pharmacyAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new pharmacy admin.`       
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
                
            });
        });
    },

    updatePharmacyAdmin: (context, pharmacyAdmin) => {
        axios.put(`/pharmacy-admins`, pharmacyAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated a pharmacy admin.`
            });
        })

        .catch(error => {
            context.commit('setResult', {
                label: 'update',
                ok: false,
                message: error.response.data.ErrorMessage       
            });
        });
    },

    deletePharmacyAdmin: (context, id) => {
        axios.delete(`/pharmacy-admins/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully deleted pharmacy admin.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'delete',
                ok: false, 
                message: error.response.data.ErrorMessage
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