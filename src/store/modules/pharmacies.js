import axios from "axios";

const PAGE_SIZE = 5;

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
    fetchAllPharmacies: (context) => {
        axios.get(`/pharmacies`)
        .then(response => {
            context.commit('setPharmacies', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacies: (context, pageNumber) => {
        axios.get(`/pharmacies/page-to`, {params: {number: pageNumber, size: PAGE_SIZE}})
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

    searchPharmacies: (context, {name, streetAndCity, sortCriteria, isAscending, gradeFrom, gradeTo, distanceFrom, distanceTo, userLat, userLon, page}) => {
        axios.get(`/pharmacies/search/pages-to`, {params: {name, streetAndCity, sortCriteria, isAscending, gradeFrom, gradeTo, distanceFrom, distanceTo, userLat, userLon, number: page, size: PAGE_SIZE}})
        .then(resp => {
            context.commit('setPharmacies', resp.data)
        })
        .catch(err => {
            context.commit('setResult', { label: 'fetch', ok: false })
        })
    },

    addMedicineToPharmacy: (context, {pharmacyId, medicineId, quantity}) => {
        axios.post(`/pharmacies/${pharmacyId}/medicines`, {medicineId, quantity})
        .then(resp => {
            context.commit('setResult', {
                label: 'addMedicineToPharmacy',
                message: `You have successfully added medicine to the pharmacy.`,
                ok: true
            });
        })
        .catch(err => {
            context.commit('setResult', { label: 'addMedicineToPharmacy', message: err.response.data.ErrorMessage, ok: false });
        })
    },

    removeMedicineFromPharmacy: (context, {pharmacyId, medicineId}) => {
        axios.delete(`/pharmacies/${pharmacyId}/medicines/${medicineId}`)
        .then(resp => {
            context.commit('setResult', {
                label: 'removeMedicineFromPharmacy',
                message: `You have successfully removed medicine from the pharmacy.`,
                ok: true
            });
        })
        .catch(err => {
            context.commit('setResult', { label: 'removeMedicineFromPharmacy', message: err.response.data.ErrorMessage, ok: false });
        })
    },

    searchPharmaciesForAppointments: (context, paramsObject) => {
        axios.get(`/pharmacies/available`, {params: paramsObject})
        .then(resp => {
            context.commit('setPharmacies', resp.data);
        })
        .catch(err => {
            context.commit('setResult', { label: 'fetch', ok: false })
        })
    },

    searchPharmaciesForAppointmentsPageTo: (context, paramsObject) => {
        axios.get(`/pharmacies/available/page`, {params: { ...paramsObject, size: PAGE_SIZE}})
        .then(resp => {
            context.commit('setPharmacies', resp.data);
        })
        .catch(err => {
            context.commit('setResult', { label: 'fetch', ok: false })
        })
    },


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