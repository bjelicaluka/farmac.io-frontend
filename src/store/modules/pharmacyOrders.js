import axios from "axios";

const state = {
    pharmacyOrder: null,
    pharmacyOrders: null,
    result: null
};

const getters = {
    getPharmacyOrder: state => state.pharmacyOrder,
    getPharmacyOrders: state => state.pharmacyOrders,
    getResult: state => state.result
};

const actions = {
    fetchPharmacyOrders: (context) => {
        // didulidudu
    },

    fetchPharmacyOrderById: (context, {pharmacyId, pharmacyOrderId}) => {
        axios.get(`/pharmacy/${pharmacyId}/pharmacy-orders/${pharmacyOrderId}`)
        .then(response => {
            context.commit('setPharmacyOrder', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    filterPharmacyOrders: (context, {pharmacyId, isProcessed}) => {
        axios.get(`/pharmacy/${pharmacyId}/pharmacy-orders/filter`, {params: {isProcessed}})
        .then(response => {
            context.commit('setPharmacyOrders', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addPharmacyOrder: (context, pharmacyOrder) => {
        axios.post(`/pharmacy/${pharmacyOrder.pharmacyId}/pharmacy-orders`, pharmacyOrder)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new pharmacy order.`
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
    updatePharmacyOrder: (context, pharmacyOrder) => {
        axios.put(`/pharmacy/${pharmacyOrder.pharmacyId}/pharmacy-orders`, pharmacyOrder)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated a pharmacy order.`
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
    deletePharmacyOrder: (context, id) => {
        // didulidudu
    },
};

const mutations = {
    setPharmacyOrder: (state, pharmacyOrder) => {
        state.pharmacyOrder = pharmacyOrder;
    },
    setPharmacyOrders: (state, pharmacyOrders) => {
        state.pharmacyOrders = pharmacyOrders;
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