import axios from "axios";
 
const PAGE_SIZE = 5;

const state = {
    supplierMedicines: null,
    result: null
};

const getters = {
    getSupplierMedicines: state => state.supplierMedicines,
    getResult: state => state.result
};

const actions = {
    fetchMedicinesForSupplier: (context, supplierId) => {
        axios.get(`/suppliers/${supplierId}/medicines-in-stock`)
        .then(response => {
            context.commit('setSupplierMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPageOfMedicinesForSupplier: (context, { supplierId, page }) => {
        axios.get(`/suppliers/${supplierId}/medicines-in-stock/page`, {params: {number: page, size: PAGE_SIZE }})
        .then(response => {
            context.commit('setSupplierMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addMedicineToSupplierStock: (context, supplierMedicine) => {
        axios.post(`/suppliers/${supplierMedicine.supplierId}/medicines-in-stock`, supplierMedicine)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added medicine to the supplier's stock.`
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
    updateMedicineFromSupplierStock: (context, supplierMedicine) => {
        axios.put(`/suppliers/${supplierMedicine.supplierId}/medicines-in-stock`, supplierMedicine)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated quantity of a medicine from the supplier's stock.`
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
    deleteMedicineFromSupplierStock: (context, {supplierId, supplierMedicineId }) => {
        axios.delete(`/suppliers/${supplierId}/medicines-in-stock/${supplierMedicineId}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully removed medicine from the supplier's stock.`
                
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
    setSupplierMedicines: (state, supplierMedicines) => {
        state.supplierMedicines = supplierMedicines;
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