import axios from "axios";

const state = {
    loyaltyPoints: null,
    result: null
};

const getters = {
    getLoyaltyPoints: state => state.loyaltyPoints,
    getResult: state => state.result
};

const actions = {
    
    fetchLoyaltyPoints: (context) => {
        axios.get(`loyalty-points`)
        .then(response => {
            context.commit('setLoyaltyPoints', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    updateLoyaltyPoints: (context, loyaltyPoints) => {
        axios.put(`loyalty-points`, loyaltyPoints)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: 'You have successfully updated loyalty points.'
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
    setLoyaltyPoints: (state, loyaltyPoints) => {
        state.loyaltyPoints = loyaltyPoints;
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