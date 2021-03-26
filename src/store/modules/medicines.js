import axios from 'axios';

const state = {
    medicines: null,
    result: null
}

const getters = {
    getMedicines: state => state.medicines
}

const actions = {
    getMedicines: (context) => {
        axios.get(`/medicines/home`)
        .then(response => {
            context.commit('setMedicines', response.data);
            context.commit('setResult', { code: response.status });
        })
        .catch(error => {
            context.commit('setResult', { code: error.response.status });
        });
    }
}

const mutations = {
    setMedicines: (state, medicines) => {
        state.medicines = medicines;
    },
    setResult: (state, result) => {
        state.result = result;
    },
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
}