import axios from "axios";

const state = {
    followings: [],
    result: null,
    currentPharmacy: null
};

const getters = {
    getFollowings: state => state.followings,
    getResult: state => state.result,
    isFollowing: state => state.followings.find(f => f.pharmacyId === state.currentPharmacy) != undefined
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
    },

    fetchPatientFollowings(context, patientId) {
        axios.get(`/patients/${patientId}/followings`)
        .then(response => {
            context.commit('setFollowings', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                message: error.response.data.ErrorMessage,
                ok: false
            })
        })
    },

    unfollowPharmacy(context, { patientId, pharmacyId }) {
        const followId = state.followings.find(f => f.pharmacyId === pharmacyId).id;
        axios.delete(`/patients/${patientId}/followings/${followId}`)
        .then(response => {
            context.commit('setResult', {
                label: 'unfollow',
                message: 'You have successfully unfollowed this pharmacy.',
                ok: true
            })
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'unfollow',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        })
    },

    setCurrentPharmacy: (context, currentPharmacy) => {
        context.commit('setCurrentPharmacy', currentPharmacy);
    },
};

const mutations = {
    setFollowings: (state, followings) => {
        state.followings = followings.map(f => {
            return {
                id: f.followId,
                pharmacyName: f.pharmacy.name,
                pharmacyId: f.pharmacy.id,
                since: f.since
            }

        });
    },
    
    setCurrentPharmacy: (state, currentPharmacy) => {
        state.currentPharmacy = currentPharmacy;
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