import axios from "axios";

const state = {
    pharmaciesForERecipe: null,
    result: null
};

const getters = {
    getPharmaciesForERecipe: state => state.pharmaciesForERecipe,
    getResult: state => state.result
};

const actions = {
    fetchPharmaciesForERecipe(context, eRecipeId) {
        axios.get(`/e-recipes/${eRecipeId}/pharmacies`)
        .then(response => {
            context.commit('setPharmaciesForERecipe', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    sortPharmaciesForERecipe(context, { eRecipeId, criteria, isAsc }) {
        axios.get(`/e-recipes/${eRecipeId}/pharmacies/sort`, { params: { criteria, isAsc } })
        .then(response => {
            context.commit('setPharmaciesForERecipe', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    createReservationFromERecipe(context, request) {
        axios.post(`/e-recipes/to-reservation`, request)
        .then(response => {
            context.commit('setResult', {
                label: 'reservation',
                ok: true,
                message: `You have successfully reserved medicines.`
            });
        }).
        catch(error => {
            context.commit('setResult', {
                label: 'reservation',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    }
};

const mutations = {
    setPharmaciesForERecipe: (state, pharmaciesForERecipe) => {
        state.pharmaciesForERecipe = pharmaciesForERecipe;
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