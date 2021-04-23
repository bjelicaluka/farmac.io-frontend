import axios from "axios";

const state = {
    pharmacyPriceList: null,
    pharmacyPriceLists: null,
    result: null
};

const getters = {
    getPharmacyPriceList: state => state.pharmacyPriceList,
    getPharmacyPriceLists: state => state.pharmacyPriceLists,
    getResult: state => state.result
};

const actions = {
    fetchPharmacyPriceLists: (context) => {
        // didulidudu
    },

    fetchPharmacyPriceListById: (context, {pharmacyId, pharmacyPriceListId}) => {
        axios.get(`/pharmacy/${pharmacyId}/price-list/${pharmacyPriceListId}`)
        .then(response => {
            context.commit('setPharmacyPriceList', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyPriceListForPharmacy: (context, pharmacyId) => {
        axios.get(`/pharmacy/${pharmacyId}/price-list`)
        .then(response => {
            context.commit('setPharmacyPriceList', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addPharmacyPriceList: (context, pharmacyPriceList) => {
        axios.post(`/pharmacy/${pharmacyPriceList.pharmacyId}/price-list`, pharmacyPriceList)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully added a new pharmacy price list.`
            });
            context.commit('setPharmacyPriceList', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },
    updatePharmacyPriceList: (context, pharmacyPriceList) => {
        axios.put(`/pharmacy/${pharmacyPriceList.pharmacyId}/price-list`, pharmacyPriceList)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated pharmacy price list.`
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
    deletePharmacyPriceList: (context, id) => {
        // didulidudu
    },
};

const mutations = {
    setPharmacyPriceList: (state, pharmacyPriceList) => {
        state.pharmacyPriceList = pharmacyPriceList;
    },
    setPharmacyPriceLists: (state, pharmacyPriceLists) => {
        state.pharmacyPriceLists = pharmacyPriceLists;
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