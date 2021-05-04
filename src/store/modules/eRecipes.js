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