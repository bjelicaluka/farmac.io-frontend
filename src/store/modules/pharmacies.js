import axios from "axios";

const state = {
    pharmacy: null,
    pharmacies: null,
    result: null
};

const getters = {
    getPharmacy: state => state.pharmacy,
    getPharmacies: state => state.pharmacies,
    getResult: state => state.result
};

const actions = {
    fetchPharmacies: (context) => {
        axios.get(`/pharmacies/home`)
        .then(response => {
            context.commit('setPharmacies', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyById: (context, id) => {
        axios.get(`/pharmacies/${id}`)
        .then(response => {
            context.commit('setPharmacy', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addPharmacy: (context, pharmacy) => {
        axios.post(`/pharmacies`, pharmacy)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                message: `You have successfully added a new pharmacy.`,
                ok: true
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        });
    },

    updatePharmacy: (context, pharmacy) => {
        axios.put(`/pharmacies`, pharmacy)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                message: `You have successfully updated the pharmacy.`,
                ok: true
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'update',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        });
    },

    deletePharmacy: (context, id) => {
        axios.delete(`/pharmacies/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                message: `You have successfully deleted pharmacy.`,
                ok: true
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'delete',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        });
    },

    searchPharmacies: (context, {name, city, sortCriteria, isAscending, gradeFrom, gradeTo, distanceFrom, distanceTo, userLat, userLon}) => {
        axios.get(`/pharmacies/search?name=${name}&streetAndCity=${city}&sortCriteria=${sortCriteria}&isAscending=${isAscending}
        &gradeFrom=${gradeFrom}&gradeTo=${gradeTo}&distanceFrom=${distanceFrom}&distanceTo=${distanceTo}&userLat=${userLat}&userLon=${userLon}`)
        .then(resp => {
            context.commit('setPharmacies', resp.data)
        })
        .catch(err => {
            context.commit('setResult', { label: 'fetch', ok: false })
        })
    }
};

const mutations = {
    setPharmacy: (state, pharmacy) => {
        state.pharmacy = pharmacy;
    },
    setPharmacies: (state, pharmacies) => {
        state.pharmacies = pharmacies;
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