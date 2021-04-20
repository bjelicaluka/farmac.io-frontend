import axios from "axios";

const state = {
    followings: null,
    result: null
};

const getters = {
    getFollowings: state => state.followings,
    getResult: state => state.result
};

const actions = {
    followPharmacy(context, {patientId, pharmacyId}) {
        axios.post(`/patients/${patientId}/followings`,
        {
            patientId,
            pharmacyId
        })
        .then(response => {
            context.commit('setResult', {
                label: 'follow',
                message: 'You are successfully following this pharmacy.',
                ok: true
            })
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'follow',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        })
    }
};

const mutations = {
    setFollowings: (state, followings) => {
        state.followings = followings;
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