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

    fetchFilteredOffersForSupplier: (context, {supplierId, filterBy}) => {
        axios.get(`/suppliers/${supplierId}/offers/filter`, {params: {status: filterBy}})
        .then(response => {
            context.commit('setSupplierOffers', response.data);
            context.commit('setResult', { label: 'fetch', ok: true });
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        })
    },

    fetchOffersForPharmacyOrder: (context, pharmacyOrderId) => {
        axios.get(`/suppliers/offers/pharmacy-order/${pharmacyOrderId}`)
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
    },

    cancelOfferFromSupplier: (context, {supplierId, offerId}) => {
        axios.delete(`/suppliers/${supplierId}/offers/${offerId}`)
        .then(response => {
            context.commit('setResult', {
                label: 'cancel',
                ok: true,
                message: `You have successfully deleted your offer.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'cancel',
                ok: false,
                message: error.response.data.ErrorMessage
                
            });
        })
    },

    acceptSupplierOffer: (context, supplierOfferId) => {
        axios.post(`/suppliers/offers/${supplierOfferId}`, {})
        .then(response => {
            context.commit('setResult', {
                label: 'accept',
                ok: true,
                message: `You have successfully accept an offer.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'accept',
                ok: false,
                message: error.response.data.ErrorMessage
                
            });
        })
    },
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