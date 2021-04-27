import axios from "axios";

const state = {
    dermatologist: null,
    dermatologists: null,
    canBeRatedDermatologists: null,
    ratedDermatologists: null,
    dermatologistGrade: null,
    result: null,
};

const getters = {
    getDermatologist: state => state.dermatologist,
    getDermatologists: state => state.dermatologists,
    getCanBeRatedDermatologists: state => state.canBeRatedDermatologists,
    getRatedDermatologists: state => state.ratedDermatologists,
    getDermatologistGrade: state => state.dermatologistGrade,
    getResult: state => state.result,
};

const actions = {
    fetchDermatologists: (context) => {
        axios.get(`/dermatologists/with-work-places`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchDermatologistById: (context, id) => {
        axios.get(`/dermatologists/${id}`)
        .then(resp => {
            context.commit('setDermatologist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyDermatologists: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists/with-work-places`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchPharmacyDermatologistById: (context, {pharmacyId, dermatologistId}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologist/${dermatologistId}`)
        .then(resp => {
            context.commit('setDermatologist', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchDermatologistsByName: (context, name) => {
        axios.get(`/dermatologists/with-work-places/search?name=${name}`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    searchPharmacyDermatologistsByName: (context, {pharmacyId, name}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists/with-work-places/search?name=${name}`)
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    filterDermatologists: (context, params) => {
        axios.get(`/dermatologists/filter`, {params})
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    filterDermatologistsWithWorkPlaces: (context, params) => {
        axios.get(`/dermatologists/with-work-places/filter`, {params})
        .then(resp => {
            context.commit('setDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'search', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addDermatologistToPharmacy: (context, {dermatologistId, pharmacyId, workTime}) => {
        axios.post(`/pharmacies/${pharmacyId}/dermatologists/${dermatologistId}`, workTime)
        .then(resp => {
            context.commit('setResult', {label: 'addToPharmacy', ok: true, message: "Successfully added dermatologist to pharmacy."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addToPharmacy', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    removeDermatologistFromPharmacy: (context, {dermatologistId, pharmacyId}) => {
        axios.delete(`/pharmacies/${pharmacyId}/dermatologists/${dermatologistId}`)
        .then(resp => {
            context.commit('setResult', {label: 'removeFromPharmacy', ok: true, message: "Successfully removed dermatologist from pharmacy."});
        })
        .catch(err => {
            console.log(err)
            context.commit('setResult', {label: 'removeFromPharmacy', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addDermatologist: (context, dermatologist) => {
        axios.post(`/dermatologists`, dermatologist)
        .then(resp => {
            context.commit('setResult', {label: 'add', ok: true, message: "Successfully registered dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'add', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    updateDermatologist: (context, dermatologist) => {
        axios.put(`/dermatologists`, dermatologist)
        .then(resp => {
            context.commit('setResult', {label: 'update', ok: true, message: "Successfully updated dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'update', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    deleteDermatologist: (context, id) => {
        axios.delete(`/dermatologists/${id}`)
        .then(resp => {
            context.commit('setResult', {label: 'delete', ok: true, message: "Successfully deleted dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'delete', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchCanBeRatedDermatologists: (context, patientId) => {
        axios.get(`/dermatologists/${patientId}/can-rate`)
        .then(resp => {
            context.commit('setCanBeRatedDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchRatedDermatologists: (context, patientId) => {
        axios.get(`/dermatologists/${patientId}/rated`)
        .then(resp => {
            context.commit('setRatedDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchDermatologistGrade: (context, { patientId, dermatologistId }) => {
        axios.get(`/dermatologists/${dermatologistId}/grade/${patientId}`)
        .then(resp => {
            context.commit('setDermatologistGrade', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    rateDermatologist: (context, {patientId, dermatologistId, grade}) => {
        console.log(dermatologistId);
        axios.post(`/dermatologists/rate`, {patientId, dermatologistId, grade})
        .then(resp => {
            context.commit('setResult', {label: 'grades', ok: true, message: "You have successfully rated a dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'grades', ok: false, message: err.response.data.ErrorMessage});
        })
    }
};

const mutations = {
    setDermatologist: (state, dermatologist) => {
        state.dermatologist = dermatologist;
    },
    setDermatologists: (state, dermatologists) => {
        state.dermatologists = dermatologists;
    },
    setResult: (state, result) => {
        state.result = result;
    },
    setCanBeRatedDermatologists: (state, canBeRatedDermatologists) => {
        state.canBeRatedDermatologists = canBeRatedDermatologists;
    },
    setRatedDermatologists: (state, ratedDermatologists) => {
        state.ratedDermatologists = ratedDermatologists;
    },
    setDermatologistGrade: (state, dermatologistGrade) => {
        state.dermatologistGrade = dermatologistGrade;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};