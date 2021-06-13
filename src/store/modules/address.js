import axios from "axios";

const state = {
    result: null,
    locationData: null
};

const getters = {
    getResult: state => state.result,
    getLocationData: state => state.locationData
};

const actions = {
    fetchLocationData: (context, addressQuery) => {
        axios.get('https://nominatim.openstreetmap.org/search.php', {params: {format: 'json', addressdetails: 1, limit: 1, q: addressQuery}})
        .then(resp => {
            if (resp.data.length > 0)
                context.commit('setLocationData', resp.data[0]);
            else
                context.commit('setResult', {label: 'addressWarn', ok: false, message: 'Invalid address'});
            })
        .catch(err => {
            context.commit('setResult', {label: 'addressErr', ok: false, message: err.response.data.ErrorMessage});
        });
    },
};

const mutations = {
    setResult: (state, result) => {
        state.result = result;
    },
    setLocationData: (state, locationData) => {
        state.locationData = locationData;
    },
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};
