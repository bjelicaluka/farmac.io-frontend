import axios from "axios";

const state = {
    supplierOffers: null,
    result: null
};

const getters = {
    getSupplierOffers: state => state.supplierOffers,
    getResult: state => state.result
};

const actions = {
    fetchOffersForSupplier: (context, supplierId) => {
        axios.get(`/suppliers/${supplierId}/offers`)
        .then(response => {
            context.commit('setSupplierOffers', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        })
    }
};

const mutations = {
    setSupplierOffers: (state, offers) => {
        state.supplierOffers = offers;
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