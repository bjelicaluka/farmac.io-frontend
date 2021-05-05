import axios from "axios";

const state = {
    eRecipes: [],
    medicinesInERecipe: [],
    result: null
};

const getters = {
    getERecipes: state => state.eRecipes,
    getMedicinesInERecipe: state => state.medicinesInERecipe,
    getResult: state => state.result
};

const actions = {
    fetchERecipes: (context, {patientId, sortCriteria, isAsc, isUsed}) => {
        axios.get(`/patients/${patientId}/eRecipes/sort`, {params: {sortCriteria, isAsc, isUsed}})
        .then(resp => {
            context.commit('setERecipes', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchMedicinesInERecipes: (context, eRecipeId) => {
        axios.get(`/medicines/${eRecipeId}/medicines`)
        .then(resp => {
            context.commit('setMedicinesInERecipe', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    }
};

const mutations = {
    setERecipes: (state, eRecipes) => {
        state.eRecipes = eRecipes
    },
    setMedicinesInERecipe: (state, medicines) => {
        state.medicinesInERecipe = medicines;
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