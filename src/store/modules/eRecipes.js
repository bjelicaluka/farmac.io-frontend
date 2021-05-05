import axios from "axios";

const state = {
    eRecipes: [],
    result: null
};

const getters = {
    getERecipes: state => state.eRecipes,
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
    }
};

const mutations = {
    setERecipes: (state, eRecipes) => {
        state.eRecipes = eRecipes
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