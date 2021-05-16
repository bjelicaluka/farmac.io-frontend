import axios from "axios";

const PAGE_SIZE = 5;

const state = {
    supplier: null,
    suppliers: null,
    result: null
};

const getters = {
    getSupplier: state => state.supplier,
    getSuppliers: state => state.suppliers,
    getResult: state => state.result
};

const actions = {
    fetchSuppliers: (context) => {
        axios.get(`/suppliers`)
        .then(response => {
            context.commit('setSuppliers', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchSuppliersPage: (context, page) => {
        axios.get(`/suppliers/page`, {params: {number: page, size: PAGE_SIZE}})
        .then(response => {
            context.commit('setSuppliers', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchSupplierById: (context, id) => {
        axios.get(`/suppliers/${id}`)
        .then(response => {
            context.commit('setSupplier', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addSupplier: (context, supplier) => {
        axios.post(`/suppliers`, supplier)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new supplier.`
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
    updateSupplier: (context, supplier) => {
        axios.put(`/suppliers`, supplier)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated a supplier.`
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
    deleteSupplier: (context, id) => {
        axios.delete(`/suppliers/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully deleted supplier.`
                
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
    setSupplier: (state, supplier) => {
        state.supplier = supplier;
    },
    setSuppliers: (state, suppliers) => {
        state.suppliers = suppliers;
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