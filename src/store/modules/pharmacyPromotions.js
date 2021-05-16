import axios from "axios";

const PAGE_SIZE = 5;

const state = {
    pharmacyPromotion: null,
    pharmacyPromotions: null,
    activePharmacyPromotions: null,
    result: null
};

const getters = {
    getPharmacyPromotion: state => state.pharmacyPromotion,
    getPharmacyPromotions: state => state.pharmacyPromotions,
    getActivePharmacyPromotions: state => state.activePharmacyPromotions,
    getResult: state => state.result
};

const actions = {
    fetchPharmacyPromotions: (context, pharmacyId) => {
        axios.get(`/pharmacy/${pharmacyId}/promotions`)
        .then(response => {
            context.commit('setPharmacyPromotions', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyPromotionsPage: (context, {pharmacyId, page}) => {
        axios.get(`/pharmacy/${pharmacyId}/promotions/page`, {params: {number: page, size: PAGE_SIZE}})
        .then(response => {
            context.commit('setPharmacyPromotions', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchActivePharmacyPromotions: (context, pharmacyId) => {
        axios.get(`/pharmacy/${pharmacyId}/promotions/active`)
        .then(response => {
            context.commit('setActivePharmacyPromotions', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyPromotionById: (context, {pharmacyId, pharmacyPromotionId}) => {
        axios.get(`/pharmacy/${pharmacyId}/promotions/${pharmacyPromotionId}`)
        .then(response => {
            context.commit('setPharmacyPromotion', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    filterPharmacyPromotions: (context, {pharmacyId, isProcessed}) => {
        axios.get(`/pharmacy/${pharmacyId}/promotions/filter`, {params: {isProcessed}})
        .then(response => {
            context.commit('setPharmacyPromotions', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addPharmacyPromotion: (context, pharmacyPromotion) => {
        axios.post(`/pharmacy/${pharmacyPromotion.pharmacyId}/promotions`, pharmacyPromotion)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new promotion.`
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

    updatePharmacyPromotion: (context, pharmacyPromotion) => {
        axios.put(`/pharmacy/${pharmacyPromotion.pharmacyId}/promotions`, pharmacyPromotion)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated a promotion.`
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

    deletePharmacyPromotion: (context, {pharmacyId, pharmacyPromotionId}) => {
        axios.delete(`/pharmacy/${pharmacyId}/promotions/${pharmacyPromotionId}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully deleted a promotion.`
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
    setPharmacyPromotion: (state, pharmacyPromotion) => {
        state.pharmacyPromotion = pharmacyPromotion;
    },
    setPharmacyPromotions: (state, pharmacyPromotions) => {
        state.pharmacyPromotions = pharmacyPromotions;
    },
    setActivePharmacyPromotions: (state, activePharmacyPromotions) => {
        state.activePharmacyPromotions = activePharmacyPromotions;
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