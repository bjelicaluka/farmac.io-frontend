import axios from 'axios';

const state = {
    medicines: null,
    medicine: null,
    pharmaciesForMedicine: null,
    result: null
}

const getters = {
    getMedicines: state => state.medicines,
    getMedicine: state => state.medicine,
    getPharmaciesForMedicine: state => state.pharmaciesForMedicine,
    getResult: state => state.result
}

const actions = {
    fetchMedicines: (context) => {
        axios.get(`/medicines`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicineById: (context, id) => {
        axios.get(`/medicines/${id}`)
        .then(response => {
            context.commit('setMedicine', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicinesForHomePage: (context) => {
        axios.get(`/medicines/home`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmaciesForMedicineById: (context, id) => {
        axios.get(`medicines/${id}/pharmacies`)
        .then(response => {
            context.commit('setPharmaciesForMedicine', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },
    
    addMedicine: (context, medicine) => {
        axios.post('/medicines', medicine)
       .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully created a new medicine.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    updateMedicine: (context, medicine) => {
        axios.put('/medicines', medicine)
       .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated an existing medicine.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'update',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },


    deleteMedicine: (context, id) => {
        axios.delete(`/medicines/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully deleted medicine.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'delete',
                ok: false, 
                message: error.response.data.ErrorMessage
            });
        });
    }

}

const mutations = {
    setMedicines: (state, medicines) => {
        state.medicines = medicines;
    },
    setMedicine: (state, medicine) => {
        state.medicine = medicine;
    },
    setPharmaciesForMedicine: (state, pharmaciesForMedicine) => {
        state.pharmaciesForMedicine = pharmaciesForMedicine; 
    },
    setResult: (state, result) => {
        state.result = result;
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
}