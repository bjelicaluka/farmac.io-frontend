import axios from "axios";

const state = {
    systemAdmin: null,
    systemAdmins: null,
    result: null
};

const getters = {
    getSytemAdmin: state => state.systemAdmin,
    getSystemAdmins: state => state.systemAdmins,
    getResult: state => state.result
};

const actions = {
    getSystemAdmins: (context) => {
        axios.get(`/system-admins`)
        .then(response => {
            context.commit('setSystemAdmins', response.data);
            context.commit('setResult', { label: 'get', code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { label: 'get', code: error.response.status });
        });
    },

    getSystemAdminById: (context, id) => {
        axios.get(`/system-admins/${id}`)
        .then(response => {
            context.commit('setSystemAdmin', response.data);
            context.commit('setResult', { label: 'get', code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { label: 'get', code: error.response.status });
        });
    },

    addSystemAdmin: (context, systemAdmin) => {
        axios.post(`/system-admins`, systemAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                text: `You have successfully added a new system administrator.`,
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
    updateSystemAdmin: (context, systemAdmin) => {
        axios.put(`/system-admins`, systemAdmin)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                text: `You have successfully updated a system administrator.`,
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
    deleteSystemAdmin: (context, id) => {
        axios.delete(`/system-admins/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                text: `You have successfully deleted system administrator.`,
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