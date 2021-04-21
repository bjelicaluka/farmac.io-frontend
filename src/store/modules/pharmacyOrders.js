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

    fetchPharmacyOrderById: (context, id) => {
        // didulidudu
    },

    addPharmacyOrder: (context, pharmacyOrder) => {
        axios.post(`/pharmacy/${pharmacyOrder.pharmacyId}/pharmacy-orders`, pharmacyOrder)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new pharmacyOrder.`
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
        // didulidudu
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