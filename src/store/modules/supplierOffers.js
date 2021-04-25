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
    },

    addOfferFromSupplier: (context, supplierOffer) => {
        axios.post(`/suppliers/${supplierOffer.supplierId}/offers`, supplierOffer)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new offer.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
                
            });
        })
    },

    updateOfferFromSupplier: (context, supplierOffer) => {
        axios.put(`/suppliers/${supplierOffer.supplierId}/offers`, supplierOffer)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated an existing offer.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'update',
                ok: false,
                message: error.response.data.ErrorMessage
                
            });
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