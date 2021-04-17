import axios from "axios";

const state = {
    systemAdmin: null,
    systemAdmins: null,
    result: null
};

const getters = {
    getSystemAdmin: state => state.systemAdmin,
    getSystemAdmins: state => state.systemAdmins,
    getResult: state => state.result
};

const actions = {
    fetchSystemAdmins: (context) => {
        axios.get(`/system-admins`)
        .then(response => {
            context.commit('setSystemAdmins', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchSystemAdminById: (context, id) => {
        axios.get(`/system-admins/${id}`)
        .then(response => {
            context.commit('setSystemAdmin', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addSystemAdmin: (context, systemAdmin) => {
        axios.post(`/system-admins`, systemAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new system administrator.`
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
    updateSystemAdmin: (context, systemAdmin) => {
        axios.put(`/system-admins`, systemAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated a system administrator.`
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
    deleteSystemAdmin: (context, id) => {
        axios.delete(`/system-admins/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully deleted system administrator.`
                
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
    setSystemAdmin: (state, systemAdmin) => {
        state.systemAdmin = systemAdmin;
    },
    setSystemAdmins: (state, systemAdmins) => {
        state.systemAdmins = systemAdmins;
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